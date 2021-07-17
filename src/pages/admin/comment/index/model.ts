import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryRule, removeRule, updateRule, forceDeleteRule, restoreRule } from './service';

import { CommentListPaginationType } from './data.d';

export interface CommentStateType {
  data: CommentListPaginationType;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: CommentStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: CommentStateType;
  effects: {
    fetch: Effect;
    update: Effect;
    destroy: Effect;
    forceDelete: Effect;
    restore: Effect;
  };
  reducers: {
    save: Reducer<CommentStateType>;
    edit: Reducer<CommentStateType>;
    remove: Reducer<CommentStateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminComment',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'edit',
        payload: response,
      });
      if (callback) callback();
    },

    *destroy({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'edit',
        payload: response,
      });
      if (callback) callback();
    },

    *forceDelete({ payload, callback }, { call, put }) {
      yield call(forceDeleteRule, payload);
      yield put({
        type: 'remove',
        payload: payload.id,
      });
      if (callback) callback();
    },

    *restore({ payload, callback }, { call, put }) {
      const response = yield call(restoreRule, payload);
      yield put({
        type: 'edit',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    edit(state, action) {
      if (state !== undefined) {
        state.data.list.forEach((value, key) => {
          if (value.id === action.payload.data.id) {
            state.data.list[key] = action.payload.data
          }
        })
      }

      return {
        data: action.payload,
        ...state,
      };
    },

    remove(state, action) {
      if (state !== undefined) {
        state.data.list.forEach((value, key) => {
          if (value.id === action.payload) {
            state.data.list.splice(key, 1);
          }
        })
      }

      return {
        data: action.payload,
        ...state,
      };
    },
  },
};

export default Model;

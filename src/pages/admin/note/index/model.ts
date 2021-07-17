import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRule, queryRule, removeRule, updateRule, forceDeleteRule, restoreRule } from './service';

import { NoteListPaginationType } from './data.d';

export interface NoteStateType {
  data: NoteListPaginationType;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: NoteStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: NoteStateType;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
    destroy: Effect;
    forceDelete: Effect;
    restore: Effect;
  };
  reducers: {
    save: Reducer<NoteStateType>;
    new: Reducer<NoteStateType>;
    edit: Reducer<NoteStateType>;
    remove: Reducer<NoteStateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminNote',

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

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'new',
        payload: response,
      });
      if (callback) callback();
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

    new(state, action) {
      if (state !== undefined) {
        state.data.list.push(action.payload.data);
      }

      return {
        data: action.payload,
        ...state,
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

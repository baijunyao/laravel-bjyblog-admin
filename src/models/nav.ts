import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addNav, queryNav, removeNav, updateNav, forceDeleteNav, restoreNav } from '@/services/nav';

import { NavListPaginationType } from './data.d';

export interface NavStateType {
  data: NavListPaginationType;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: NavStateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: NavStateType;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
    destroy: Effect;
    forceDelete: Effect;
    restore: Effect;
  };
  reducers: {
    save: Reducer<NavStateType>;
    new: Reducer<NavStateType>;
    edit: Reducer<NavStateType>;
    remove: Reducer<NavStateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminNav',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryNav, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addNav, payload);
      yield put({
        type: 'new',
        payload: response,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateNav, payload);
      yield put({
        type: 'edit',
        payload: response,
      });
      if (callback) callback();
    },

    *destroy({ payload, callback }, { call, put }) {
      const response = yield call(removeNav, payload);
      yield put({
        type: 'edit',
        payload: response,
      });
      if (callback) callback();
    },

    *forceDelete({ payload, callback }, { call, put }) {
      yield call(forceDeleteNav, payload);
      yield put({
        type: 'remove',
        payload: payload.id,
      });
      if (callback) callback();
    },

    *restore({ payload, callback }, { call, put }) {
      const response = yield call(restoreNav, payload);
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

import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRule, queryRule, removeRule, updateRule } from './service';

import { TableListData } from './data.d';

export interface StateType {
  data: TableListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    new: Reducer<StateType>;
    edit: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminAndcategoryAndindex',

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
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
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
        state.data.list.push(action.payload.list);
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
  },
};

export default Model;

import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryRule, updateRule } from '@/pages/admin/config/service';
import { ConfigListPaginationType } from './data.d';

export interface ConfigStateType {
  data: ConfigListPaginationType;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ConfigStateType;
  effects: {
    fetch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<ConfigStateType>;
    edit: Reducer<ConfigStateType>;
  };
}
const Model: ModelType = {
  namespace: 'adminConfig',

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
  },
};

export default Model;

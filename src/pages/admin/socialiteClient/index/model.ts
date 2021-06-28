import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { querySocialiteClients, updateSocialiteClients } from './service';

import { SocialiteClientListType, SocialiteClientType } from './data.d';

export interface StateType {
  data: SocialiteClientListType;
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
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    edit: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'adminSocialiteClient',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(querySocialiteClients, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateSocialiteClients, payload);
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
      if (state === undefined) {
        return {
          data: {
            list: [],
            pagination: {},
          },
        }
      }

      const list: SocialiteClientType[] = [...state.data.list];

      list.forEach((socialiteClient, index) => {
        if (socialiteClient.id === action.payload.data.id) {
          list[index] = action.payload.data
        }
      })

      return {
        data: {
          ...state.data,
          list,
        },
      };
    },
  },
};

export default Model;

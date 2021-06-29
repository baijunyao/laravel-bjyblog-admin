import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { DashboardType } from './data.d';
import { analysis } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: DashboardType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: DashboardType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<DashboardType>;
  };
}

const Model: ModelType = {
  namespace: 'adminDashboard',

  state: {
    latest_socialite_users: [],
    latest_comments: [],
    versions: {
      system: '',
      web_server: '',
      php: '',
      mysql: '',
    },
    counts: {
      articles: '',
      comments: '',
      notes: '',
      socialite_users: '',
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(analysis);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;

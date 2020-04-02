import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import {AnalysisData, Counts, LatestComments, Versions} from './data.d';
import { analysis } from './service';
import {TableListItem as SocialiteUser} from "@/pages/admin/socialiteUser/index/data";

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: AnalysisData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
}

const initState = {
  latest_socialite_users: [],
  latest_comments: [],
  versions: {},
  counts: {},
};

const Model: ModelType = {
  namespace: 'dashboardAndanalysis',

  state: initState,

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
    clear() {
      return initState;
    },
  },
};

export default Model;

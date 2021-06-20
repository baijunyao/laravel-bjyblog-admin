import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryArticle, queryArticles, addArticle, updateArticle, removeArticle, forceDeleteArticle, restoreArticle } from '@/services/article';
import { ArticleType, ArticleListType } from '@/models/data.d';

export interface ArticleStateType {
  list_data: ArticleListType;
  current_data: ArticleType | null;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ArticleStateType) => T) => T },
) => void;

export interface ArticleModelType {
  namespace: string;
  state: ArticleStateType;
  effects: {
    fetchOne: Effect,
    fetchAll: Effect,
    add: Effect,
    update: Effect,
    destroy: Effect,
    forceDelete: Effect,
    restore: Effect,
  };
  reducers: {
    listDataSave: Reducer;
    currentDataSave: Reducer;
    listDataReplace: Reducer;
    listDataRemove: Reducer;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'adminArticle',

  state: {
    list_data: {
      list: [],
      pagination: {},
    },
    current_data: null,
  },
  effects: {
    *fetchOne({ payload }, { call, put }) {
      const response = yield call(queryArticle, payload);
      yield put({
        type: 'currentDataSave',
        payload: response.data,
      });
    },

    *fetchAll({ payload }, { call, put }) {
      const response = yield call(queryArticles, payload);
      yield put({
        type: 'listDataSave',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(addArticle, payload);
      yield put({
        type: 'listDataNew',
        payload: response,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateArticle, payload);

      yield put({
        type: 'currentDataSave',
        payload: response.data,
      });

      if (callback) callback();
    },

    *destroy({ payload, callback }, { call, put }) {
      yield call(removeArticle, payload);
      const response = yield call(queryArticle, payload.id);

      yield put({
        type: 'listDataReplace',
        payload: response.data,
      });
      if (callback) callback();
    },

    *forceDelete({ payload, callback }, { call, put }) {
      yield call(forceDeleteArticle, payload);
      yield put({
        type: 'listDataRemove',
        payload,
      });
      if (callback) callback();
    },

    *restore({ payload, callback }, { call, put }) {
      const response = yield call(restoreArticle, payload);
      yield put({
        type: 'listDataReplace',
        payload: response.data,
      });
      if (callback) callback();
    },
  },
  reducers: {
    listDataSave(state, action) {
      return {
        ...state,
        list_data: action.payload,
      };
    },

    currentDataSave(state, action) {
      return {
        ...state,
        current_data: action.payload,
      };
    },

    listDataReplace(state, action) {
      const { list } = state.list_data;

      list.forEach((value: ArticleType, key:number) => {
        if (value.id === action.payload.id) {
          list[key] = action.payload
        }
      })

      return {
        current_data: state.current_data,
        list_data: {
          ...state.list_data,
          list,
        },
      };
    },

    listDataRemove(state, action) {
      const { list } = state.list_data;

      list.forEach((value: ArticleType, key:number) => {
        if (value.id === action.payload.id) {
          list.splice(key, 1);
        }
      })

      return {
        current_data: state.current_data,
        list_data: {
          ...state.list_data,
          list,
        },
      };
    },
  },
};

export default ArticleModel;

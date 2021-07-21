import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface CurrentUser {
  avatar: string;
  name: string;
}

export interface ModalModelState {
  visible: boolean;
}

export interface ModalModelType {
  namespace: 'modal';
  state: ModalModelState;
  effects: {
    update: Effect;
  };
  reducers: {
    save: Reducer<ModalModelState>;
  };
}

const ModalModel: ModalModelType = {
  namespace: 'modal',

  state: {
    visible: false,
  },

  effects: {
    *update({ payload, callback }, { call, put }) {
      yield put({
        type: 'save',
        payload,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ModalModel;

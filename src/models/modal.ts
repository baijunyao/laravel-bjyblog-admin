import { Effect } from 'dva';
import { Reducer } from 'redux';
import { MetaType } from '@/components/FormBuilder';

export interface ModalModelState {
  title: string;
  visible: boolean;
  meta: MetaType[];
  actionType: string;
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
    title: '',
    visible: false,
    meta: [],
    actionType: '',
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

import { Effect } from 'dva';
import { Reducer } from 'redux';

import { showCurrentUser } from '@/pages/admin/adminUser/index/service';
import { showCurrentSocialiteUser } from '@/pages/admin/socialiteUser/index/service';

export interface CurrentUser {
  avatar: string;
  name: string;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      avatar: '',
      name: '',
    },
  },

  effects: {
    *fetch(_, { call, put }) {
      let currentUser:CurrentUser = yield call(showCurrentSocialiteUser);

      console.log('currentUser');
      console.log(currentUser);
      if (currentUser.name === '') {
        currentUser = yield call(showCurrentUser);
      }

      console.log('currentUser');
      console.log(currentUser);

      yield put({
        type: 'saveCurrentUser',
        payload: currentUser,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
};

export default UserModel;

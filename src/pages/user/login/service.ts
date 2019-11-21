import request from '@/utils/request';
import { FormDataType } from './index';

export async function fakeAccountLogin(params: FormDataType) {
  return request('/oauth/token', {
    method: 'POST',
    data: {
      grant_type: 'password',
      client_id: 1,
      scope: '',
      username: params.email,
      password: params.password,
    },
  });
}

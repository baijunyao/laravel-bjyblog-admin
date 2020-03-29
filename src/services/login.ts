import request from '@/utils/request';
import { FormDataType } from '@/pages/user/login';

export async function login(params: FormDataType) {
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

export async function logout() {
  return request('/api/auth/passport/logout', {
    method: 'POST',
  });
}

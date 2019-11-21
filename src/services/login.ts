import request from 'umi-request';

export interface LoginParamsType {
  email: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/oauth/authorize', {
    method: 'POST',
    data: params,
  });
}

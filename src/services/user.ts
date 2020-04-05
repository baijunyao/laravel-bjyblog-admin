import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users2');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/socialiteUsers/me');
}

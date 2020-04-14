import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  return request('/api/socialiteUsers', {
    params,
  });
}

export async function showSocialiteUser(id: string|number) {
  return request(`/api/socialiteUsers/${id}`);
}

export async function showCurrentSocialiteUser() {
  const response = await request('/api/socialiteUsers/me');

  return response.status === undefined ? {
    name: response.data.name,
    avatar: response.data.avatar,
  } : {
    name: undefined,
    avatar: undefined,
  };
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/socialiteUsers/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

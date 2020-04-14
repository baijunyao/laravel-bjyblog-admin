import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  return request('/api/users', {
    params,
  });
}

export async function showUser(id: string|number) {
  return request(`/api/users/${id}`);
}

export async function showCurrentUser() {
  const response = await request('/api/users/me');

  return response.data === undefined ? {
    name: undefined,
    avatar: undefined,
  } : {
    name: response.data.name,
    avatar: '/uploads/avatar/default.jpg',
  };
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

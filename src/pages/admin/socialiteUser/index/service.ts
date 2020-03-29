import request, { convertPaginationResponse } from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/socialiteUsers', {
    params,
  });

  return convertPaginationResponse(response);
}

export async function showSocialiteUser(id: string|number) {
  const response = await request(`/api/socialiteUsers/${id}`);

  return convertPaginationResponse(response);
}

export async function showCurrentSocialiteUser() {
  const response = await request('/api/socialiteUsers/me');

  return response.status === undefined ? {
    name: response.data.name,
    avatar: response.data.avatar,
  } : {
    name: '',
    avatar: '',
  };
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/socialiteUsers/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

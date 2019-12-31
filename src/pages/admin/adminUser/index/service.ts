import request, { convertPaginationResponse } from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/users', {
    params,
  });

  return convertPaginationResponse(response);
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

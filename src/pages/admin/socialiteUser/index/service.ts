import request, { convertPaginationResponse } from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/socialiteUsers', {
    params,
  });

  return convertPaginationResponse(response);
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/socialiteUsers/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

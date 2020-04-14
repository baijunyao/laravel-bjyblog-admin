import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  return request('/api/socialiteClients', {
    params,
  });
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/socialiteClients/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

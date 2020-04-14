import request from '@/utils/request';
import { TableListParams } from '@/models/data';
import { UpdateItem } from '@/pages/admin/config/components/UpdateForm';
import { TableListItem } from '@/pages/admin/config/data';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/configs', {
    params,
  });

  const dataById: TableListItem[] = [];

  response.list.forEach((config: TableListItem) => {
    dataById[config.id] = config;
  })

  response.list = dataById;

  return response;
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/configs/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

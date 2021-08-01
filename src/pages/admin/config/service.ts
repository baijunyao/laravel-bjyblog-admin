import request from '@/utils/request';
import { TableListParams } from '@/models/data';
import { ConfigType } from '@/pages/admin/config/data';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/configs', {
    params,
  });

  const dataById: ConfigType[] = [];

  response.list.forEach((config: ConfigType) => {
    dataById[config.id] = config;
  })

  response.list = dataById;

  return response;
}

export async function updateRule(params: ConfigType) {
  return request(`/api/configs/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

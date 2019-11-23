import request, { convertPaginationResponse } from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/categories', {
    params,
  });

  return convertPaginationResponse(response);
}

export async function removeRule(params: TableListParams) {
  const response = request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
  console.log(response);
  return response;
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

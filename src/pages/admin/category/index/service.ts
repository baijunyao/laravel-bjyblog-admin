import request, { convertPaginationResponse } from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { NewCategory } from './components/CreateForm'

export async function queryRule(params: TableListParams) {
  const response = await request('/api/categories', {
    params,
  });

  return convertPaginationResponse(response);
}

export async function addRule(params: NewCategory) {
  const response = await request('/api/categories', {
    method: 'POST',
    data: params,
  });

  return convertPaginationResponse(response);
}

export async function removeRule(params: TableListParams) {
  const response = request('/api/categories', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });

  return response;
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

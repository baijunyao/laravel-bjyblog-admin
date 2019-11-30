import request, { convertPaginationResponse } from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { NewCategory } from './components/CreateForm'
import { UpdateCategory } from '@/pages/admin/category/index/components/UpdateForm';

export async function queryRule(params: TableListParams) {
  const response = await request('/api/categories', {
    params,
  });

  return convertPaginationResponse(response);
}

export async function addRule(params: NewCategory) {
  return request('/api/categories', {
    method: 'POST',
    data: params,
  });
}

export async function updateRule(params: UpdateCategory) {
  return request(`/api/categories/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeRule(params: UpdateCategory) {
  return request(`/api/categories/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteRule(params: UpdateCategory) {
  return request(`/api/categories/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

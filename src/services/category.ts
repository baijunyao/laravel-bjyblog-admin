import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { NewCategory } from '@/pages/admin/category/index/components/CreateForm'
import { UpdateCategory } from '@/pages/admin/category/index/components/UpdateForm';

export async function queryRule(params: TableListParams) {
  return request('/api/categories', {
    params,
  });
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

export async function restoreRule(params: UpdateCategory) {
  return request(`/api/categories/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

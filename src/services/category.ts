import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { NewCategory } from '@/pages/admin/category/index/components/CreateForm'
import { UpdateCategory } from '@/pages/admin/category/index/components/UpdateForm';

export async function queryCategory(params: TableListParams) {
  return request('/api/categories', {
    params,
  });
}

export async function addCategory(params: NewCategory) {
  return request('/api/categories', {
    method: 'POST',
    data: params,
  });
}

export async function updateCategory(params: UpdateCategory) {
  return request(`/api/categories/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeCategory(params: UpdateCategory) {
  return request(`/api/categories/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteCategory(params: UpdateCategory) {
  return request(`/api/categories/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

export async function restoreCategory(params: UpdateCategory) {
  return request(`/api/categories/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

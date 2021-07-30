import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { CategoryType } from '@/models/data.d'

export async function queryRule(params: TableListParams) {
  return request('/api/comments', {
    params,
  });
}

export async function updateRule(params: CategoryType) {
  return request(`/api/comments/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeRule(params: CategoryType) {
  return request(`/api/comments/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteRule(params: CategoryType) {
  return request(`/api/comments/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

export async function restoreRule(params: CategoryType) {
  return request(`/api/comments/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

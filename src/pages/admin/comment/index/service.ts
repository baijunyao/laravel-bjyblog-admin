import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { UpdateItem } from './components/UpdateForm';

export async function queryRule(params: TableListParams) {
  return request('/api/comments', {
    params,
  });
}

export async function updateRule(params: UpdateItem) {
  return request(`/api/comments/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeRule(params: UpdateItem) {
  return request(`/api/comments/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteRule(params: UpdateItem) {
  return request(`/api/comments/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

export async function restoreRule(params: UpdateItem) {
  return request(`/api/comments/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

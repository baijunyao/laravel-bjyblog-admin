import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { NewItem } from '@/pages/admin/tag/index/components/CreateForm'
import { UpdateItem } from '@/pages/admin/tag/index/components/UpdateForm';

export async function queryTags(params: TableListParams) {
  return request('/api/tags', {
    params,
  });
}

export async function addTag(params: NewItem) {
  return request('/api/tags', {
    method: 'POST',
    data: params,
  });
}

export async function updateTag(params: UpdateItem) {
  return request(`/api/tags/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeTag(params: UpdateItem) {
  return request(`/api/tags/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteTag(params: UpdateItem) {
  return request(`/api/tags/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

export async function restoreTag(params: UpdateItem) {
  return request(`/api/tags/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

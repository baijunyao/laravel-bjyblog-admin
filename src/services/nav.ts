import request from '@/utils/request';
import { TableListParams } from '@/models/data.d';
import { NewNav } from '@/pages/admin/nav/index/components/CreateForm'
import { UpdateNav } from '@/pages/admin/nav/index/components/UpdateForm';

export async function queryNav(params: TableListParams) {
  return request('/api/navs', {
    params,
  });
}

export async function addNav(params: NewNav) {
  return request('/api/navs', {
    method: 'POST',
    data: params,
  });
}

export async function updateNav(params: UpdateNav) {
  return request(`/api/navs/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeNav(params: UpdateNav) {
  return request(`/api/navs/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteNav(params: UpdateNav) {
  return request(`/api/navs/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

export async function restoreNav(params: UpdateNav) {
  return request(`/api/navs/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

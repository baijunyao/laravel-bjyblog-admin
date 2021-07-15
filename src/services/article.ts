import request from '@/utils/request';
import { ArticleType, ArticleListPaginationType } from '@/models/data';

export async function queryArticle(id: number) {
  return request(`/api/articles/${id}`);
}

export async function queryArticles(params: ArticleListPaginationType) {
  return request('/api/articles', {
    params,
  });
}

export async function addArticle(params: ArticleType) {
  return request('/api/articles', {
    method: 'POST',
    data: params,
  });
}

export async function updateArticle(params: ArticleType) {
  return request(`/api/articles/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeArticle(params: ArticleType) {
  return request(`/api/articles/${params.id}`, {
    method: 'DELETE',
    data: params,
  });
}

export async function forceDeleteArticle(params: ArticleType) {
  return request(`/api/articles/${params.id}/forceDelete`, {
    method: 'DELETE',
    data: params,
  });
}

export async function restoreArticle(params: ArticleType) {
  return request(`/api/articles/${params.id}/restore`, {
    method: 'PATCH',
    data: params,
  });
}

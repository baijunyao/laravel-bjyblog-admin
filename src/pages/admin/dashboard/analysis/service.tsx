import request from '@/utils/request';

export async function analysis() {
  return request('/api/dashboard/analysis');
}

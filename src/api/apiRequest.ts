import { apiClient } from './apiClient.ts'

export const request = async <TResponse, TPayload = unknown>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  payload?: TPayload
): Promise<TResponse> => {
  const { data } = await apiClient.request<TResponse>({
    method,
    url,
    ...(method === 'get' ? { params: payload } : { data: payload })
  })
  return data
}

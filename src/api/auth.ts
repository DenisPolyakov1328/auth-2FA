import { apiClient } from './apiClient.ts'

export interface LoginResponse {
  need2fa: boolean
  sessionId: string
  expiresIn: number
}

export interface LoginPayload {
  email: string
  password: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
  return data
}

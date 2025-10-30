import { request } from '../apiRequest.ts'
import type {
  LoginPayload,
  LoginResponse,
  ResendCodeResponse,
  Verify2faPayload,
  Verify2faResponse
} from './auth.types.ts'

export const login = (payload: LoginPayload) =>
  request<LoginResponse, LoginPayload>('post', '/auth/login', payload)

export const verify2fa = (payload: Verify2faPayload) =>
  request<Verify2faResponse, Verify2faPayload>('post', '/auth/2fa', payload)

export const resendCode = () =>
  request<ResendCodeResponse>('post', '/auth/resend')

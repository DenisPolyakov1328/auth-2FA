export interface LoginResponse {
  need2fa: boolean
  sessionId: string
  expiresIn: number
}

export interface LoginPayload {
  email: string
  password: string
}

export interface Verify2faPayload {
  sessionId: string
  code: string
}

export interface Verify2faResponse {
  token: string
}

export interface ResendCodeResponse {
  sent: boolean
  expiresIn: number
}

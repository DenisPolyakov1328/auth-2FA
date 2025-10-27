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
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    throw new Error('Ошибка авторизации')
  }

  return res.json()
}

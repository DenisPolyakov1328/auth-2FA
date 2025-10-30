import { useMutation } from '@tanstack/react-query'
import type { LoginPayload, LoginResponse } from '../api/auth/auth.types.ts'
import { login } from '../api/auth/auth.ts'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login
  })
}

import { useMutation } from '@tanstack/react-query'
import { login, type LoginPayload, type LoginResponse } from '../api/auth.ts'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login
  })
}

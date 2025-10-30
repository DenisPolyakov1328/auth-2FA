import { useMutation } from '@tanstack/react-query'
import type { ResendCodeResponse } from '../api/auth/auth.types.ts'
import { resendCode } from '../api/auth/auth.ts'

export const useResendCode = () => {
  return useMutation<ResendCodeResponse, Error>({
    mutationFn: resendCode
  })
}

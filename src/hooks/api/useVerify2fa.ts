import { useMutation } from '@tanstack/react-query'
import type {
  Verify2faPayload,
  Verify2faResponse
} from '../../api/auth/auth.types.ts'
import { verify2fa } from '../../api/auth/auth.ts'

export const useVerify2fa = () => {
  return useMutation<Verify2faResponse, Error, Verify2faPayload>({
    mutationFn: verify2fa
  })
}

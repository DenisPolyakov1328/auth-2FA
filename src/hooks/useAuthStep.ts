import { useState } from 'react'
import type { LoginResponse } from '../api/auth/auth.types.ts'

export const useAuthStep = () => {
  const [step, setStep] = useState<'login' | '2fa'>('login')
  const [sessionData, setSessionData] = useState<{
    sessionId: string
    expiresIn: number
  } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = (data: LoginResponse) => {
    if (data.need2fa) {
      setSessionData({ sessionId: data.sessionId, expiresIn: data.expiresIn })
      setStep('2fa')
    } else {
      setIsAuthenticated(true)
    }
  }

  const handle2faSuccess = () => {
    setIsAuthenticated(true)
    setSessionData(null)
    setStep('login')
  }

  const resetAuth = () => {
    setStep('login')
    setSessionData(null)
    setIsAuthenticated(false)
  }

  return {
    step,
    sessionData,
    isAuthenticated,
    setStep,
    handleLoginSuccess,
    handle2faSuccess,
    resetAuth
  }
}

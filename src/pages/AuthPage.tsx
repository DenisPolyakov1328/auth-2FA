import { useState } from 'react'
import { FormContainer } from '../components/ui/FormContainer.tsx'
import { LoginForm } from '../components/LoginForm.tsx'
import { TwoFactorForm } from '../components/TwoFactorForm.tsx'
import type { LoginResponse } from '../api/auth/auth.types.ts'

export const AuthPage = () => {
  const [step, setStep] = useState<'login' | '2fa'>('login')
  const [sessionData, setSessionData] = useState<{
    sessionId: string
    expiresIn: number
  } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = (data: LoginResponse) => {
    if (data.need2fa) {
      setSessionData({
        sessionId: data.sessionId,
        expiresIn: data.expiresIn
      })
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

  if (isAuthenticated) {
    return <div>Добро пожаловать! Пользователь авторизован.</div>
  }

  return (
    <FormContainer>
      {step === 'login' ? (
        <LoginForm onSuccess={handleLoginSuccess} />
      ) : sessionData ? (
        <TwoFactorForm
          sessionId={sessionData.sessionId}
          expiresIn={sessionData.expiresIn}
          onBack={() => setStep('login')}
          onSuccess={handle2faSuccess}
          onExpired={() => {
            console.log('Код истёк')
          }}
        />
      ) : null}
    </FormContainer>
  )
}

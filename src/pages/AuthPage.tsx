import { useState } from 'react'
import { FormContainer } from '../components/ui/FormContainer.tsx'
import { LoginForm } from '../components/LoginForm.tsx'
import { TwoFactorForm } from '../components/TwoFactorForm.tsx'

export const AuthPage = () => {
  const [step, setStep] = useState<'login' | '2fa'>('login')
  const [expiresIn, setExpiresIn] = useState(0)

  return (
    <FormContainer>
      {step === 'login' ? (
        <LoginForm
          onNeed2FA={(expiresInValue: number) => {
            setExpiresIn(expiresInValue)
            setStep('2fa')
          }}
        />
      ) : (
        <TwoFactorForm
          expiresIn={expiresIn}
          onBack={() => setStep('login')}
          onSuccess={() => {
            console.log('Двухфакторная аутентификация')
          }}
          onExpired={() => {
            console.log('Код истёк')
          }}
        />
      )}
    </FormContainer>
  )
}

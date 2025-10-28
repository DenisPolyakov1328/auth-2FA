import { useState } from 'react'
import { FormContainer } from '../components/ui/FormContainer.tsx'
import { LoginForm } from '../components/LoginForm.tsx'
import { TwoFactorForm } from '../components/TwoFactorForm.tsx'

export const AuthPage = () => {
  const [sessionId, setSessionId] = useState<string | null>(null)
  return (
    <FormContainer>
      {!sessionId ? <LoginForm /> : <TwoFactorForm />}
    </FormContainer>
  )
}

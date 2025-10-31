import { FormContainer } from '../components/ui/FormContainer.tsx'
import { LoginForm } from '../components/LoginForm.tsx'
import { TwoFactorForm } from '../components/TwoFactorForm.tsx'
import { useAuthStep } from '../hooks/useAuthStep.ts'

export const AuthPage = () => {
  const {
    step,
    sessionData,
    isAuthenticated,
    setStep,
    handleLoginSuccess,
    handle2faSuccess
  } = useAuthStep()

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
        />
      ) : null}
    </FormContainer>
  )
}

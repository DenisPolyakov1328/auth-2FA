import { DashboardPage } from './DashboardPage.tsx'
import { FormContainer } from '../components/ui/FormContainer.tsx'
import { LoginForm } from '../components/LoginForm.tsx'
import { TwoFactorForm } from '../components/TwoFactorForm.tsx'
import { useAuthStep } from '../hooks/useAuthStep.ts'

export const AuthPage = () => {
  const {
    step,
    sessionData,
    isAuthenticated,
    handleLoginSuccess,
    handle2faSuccess,
    resetAuth
  } = useAuthStep()

  if (isAuthenticated) {
    return <DashboardPage onReset={resetAuth} />
  }

  return (
    <FormContainer>
      {step === 'login' ? (
        <LoginForm onSuccess={handleLoginSuccess} />
      ) : sessionData ? (
        <TwoFactorForm
          sessionId={sessionData.sessionId}
          expiresIn={sessionData.expiresIn}
          onBack={resetAuth}
          onSuccess={handle2faSuccess}
        />
      ) : null}
    </FormContainer>
  )
}

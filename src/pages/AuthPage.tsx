import { useState } from 'react'
import { LoginForm } from '../components/LoginForm.tsx'
import { TwoFactorForm } from '../components/TwoFactorForm.tsx'

export const AuthPage = () => {
  const [sessionId, setSessionId] = useState<string | null>(null)
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-[440px] bg-white flex items-center justify-center">
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-[9px]">
            <img alt="icon" src="/symbol.svg" />
            <span className="text-2xl">Company</span>
          </div>
          {!sessionId ? <LoginForm /> : <TwoFactorForm />}
        </div>
      </div>
    </div>
  )
}

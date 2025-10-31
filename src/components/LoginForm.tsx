import { Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader.tsx'
import { useLogin } from '../hooks/useLogin.ts'
import { useEffect, useState } from 'react'
import { loginSchema } from '../schemas/auth.ts'
import { ZodFormItem } from './ui/ZodFormItem.tsx'
import { SubmitButton } from './ui/SubmitButton.tsx'

interface LoginFormProps {
  onSuccess: (data: {
    need2fa: boolean
    sessionId: string
    expiresIn: number
  }) => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [mounted, setMounted] = useState(false)
  const [form] = Form.useForm()
  const loginMutation = useLogin()
  const [serverError, setServerError] = useState<string | null>(null)

  const onFinish = (values: { email: string; password: string }) => {
    setServerError(null)
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        onSuccess(data)
      },
      onError: () => {
        setServerError('Invalid credentials')
        form.setFields([
          { name: 'email', errors: ['Invalid credentials'] },
          { name: 'password', errors: ['Invalid credentials'] }
        ])
      }
    })
  }

  useEffect(() => setMounted(true), [])

  return (
    <>
      <FormHeader />
      <Form
        form={form}
        name="loginForm"
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 20 }}
      >
        <ZodFormItem
          name="email"
          schema={loginSchema.shape.email}
          serverError={serverError}
          style={{ marginBottom: 16 }}
        >
          <Input
            size="large"
            placeholder="Email"
            prefix={<UserOutlined style={{ marginRight: 4 }} />}
            onChange={() => serverError && setServerError(null)}
          />
        </ZodFormItem>

        <ZodFormItem
          name="password"
          schema={loginSchema.shape.password}
          serverError={serverError}
          style={{ marginBottom: 16 }}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined style={{ marginRight: 10 }} />}
            visibilityToggle={false}
            onChange={() => serverError && setServerError(null)}
          />
        </ZodFormItem>

        <Form.Item shouldUpdate style={{ marginBottom: 0 }}>
          {() => (
            <SubmitButton form={form} mounted={mounted}>
              Log in
            </SubmitButton>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

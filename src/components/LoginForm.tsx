import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader.tsx'
import { useLogin } from '../hooks/useLogin.ts'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Please enter your email' })
    .email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .nonempty({ message: 'Please enter your password' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, {
      message: 'Password contains invalid characters'
    })
})

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
        <Form.Item
          name="email"
          style={{ marginBottom: 16 }}
          rules={[
            {
              validator: (_, value) => {
                const result = loginSchema.shape.email.safeParse(value)
                return result.success
                  ? Promise.resolve()
                  : Promise.reject(result.error.issues[0].message)
              }
            }
          ]}
        >
          <Input
            size="large"
            placeholder="Email"
            prefix={<UserOutlined style={{ marginRight: 4 }} />}
            onChange={() => serverError && setServerError(null)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          style={{ marginBottom: 16 }}
          rules={[
            {
              validator: (_, value) => {
                const result = loginSchema.shape.password.safeParse(value)
                return result.success
                  ? Promise.resolve()
                  : Promise.reject(result.error.issues[0].message)
              }
            }
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined style={{ marginRight: 10 }} />}
            visibilityToggle={false}
            onChange={() => serverError && setServerError(null)}
          />
        </Form.Item>

        <Form.Item shouldUpdate style={{ marginBottom: 0 }}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={
                !mounted ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

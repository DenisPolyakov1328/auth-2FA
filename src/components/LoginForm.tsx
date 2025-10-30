import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader.tsx'
import { useLogin } from '../hooks/useLogin.ts'
import { useEffect, useState } from 'react'

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

  const onFinish = (values: { email: string; password: string }) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        onSuccess(data)
      },
      onError: (error) => {
        console.error('Ошибка логина:', error.message)
      }
    })
    form.resetFields()
  }

  // убрал мигание кнопки при перезагрузке страницы
  useEffect(() => {
    setMounted(true)
  }, [])
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
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email address' }
          ]}
        >
          <Input
            size="large"
            placeholder="Email"
            prefix={<UserOutlined style={{ marginRight: 4 }} />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          style={{ marginBottom: 16 }}
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' },
            {
              pattern: /^[a-zA-Z0-9!@#$%^&*]+$/,
              message: 'Password contains invalid characters'
            }
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined style={{ marginRight: 10 }} />}
            visibilityToggle={false}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }} shouldUpdate>
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

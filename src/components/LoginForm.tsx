import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader.tsx'

export const LoginForm = () => {
  const [form] = Form.useForm()

  const onFinish = (values: { email: string; password: string }) => {
    console.log('Submitted:', values)

    form.resetFields()
  }

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
            visibilityToggle={false} // Убрал глаз только из-за макета
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

import { Button, Flex, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader.tsx'

export const LoginForm = () => {
  return (
    <>
      <FormHeader />
      <Flex vertical={true} gap={16} style={{ marginTop: 20, width: '100%' }}>
        <Input size="large" placeholder="Email" prefix={<UserOutlined />} />
        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<LockOutlined />}
          visibilityToggle={false} // Убрал глаз только из-за макета
        />
        <Button type="primary" size="large" disabled>
          Log in
        </Button>
      </Flex>
    </>
  )
}

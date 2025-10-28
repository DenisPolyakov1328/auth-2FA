import { CompanyLogo } from './ui/CompanyLogo.tsx'
import { Flex, Typography } from 'antd'

const { Title, Text } = Typography

interface LoginFormProps {
  showTwoFactorDescription?: boolean
}

export const FormHeader = ({
  showTwoFactorDescription = false
}: LoginFormProps) => {
  return (
    <Flex
      vertical={true}
      justify="center"
      align="center"
      style={{ padding: '0 20px' }}
    >
      <CompanyLogo companyName="Company" logoUrl="/symbol.svg" />

      <Title level={3} style={{ textAlign: 'center', margin: '4px 0' }}>
        {showTwoFactorDescription
          ? 'Two-Factor Authentication'
          : 'Sign in to your account to continue'}
      </Title>

      {showTwoFactorDescription && (
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Enter the 6-digit code from the Google Authenticator app
        </Text>
      )}
    </Flex>
  )
}

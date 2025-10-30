import { CompanyLogo } from './ui/CompanyLogo.tsx'
import { Flex, Grid, Typography } from 'antd'

const { Title } = Typography
const { useBreakpoint } = Grid

interface FormHeaderProps {
  showTwoFactorDescription?: boolean
}

export const FormHeader = ({
  showTwoFactorDescription = false
}: FormHeaderProps) => {
  const screens = useBreakpoint()
  const padding = screens.xs ? 0 : '0 20px'

  return (
    <Flex vertical={true} justify="center" align="center" style={{ padding }}>
      <CompanyLogo companyName="Company" logoUrl="/symbol.svg" />

      <Title level={3} style={{ textAlign: 'center', margin: '4px 0' }}>
        {showTwoFactorDescription
          ? 'Two-Factor Authentication'
          : 'Sign in to your account to continue'}
      </Title>

      {showTwoFactorDescription && (
        <Title
          level={5}
          style={{ textAlign: 'center', margin: 0, fontWeight: 400 }}
        >
          Enter the 6-digit code from the Google Authenticator app
        </Title>
      )}
    </Flex>
  )
}

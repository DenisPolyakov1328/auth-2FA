import { FormContainer } from '../components/ui/FormContainer.tsx'
import { Button, Typography } from 'antd'

const { Title } = Typography

interface DashboardPageProps {
  onReset: () => void
}

export const DashboardPage = ({ onReset }: DashboardPageProps) => {
  return (
    <FormContainer>
      <Title level={4} style={{ textAlign: 'center' }}>
        Welcome! The user is authenticated.
      </Title>

      <Button type="primary" block onClick={onReset}>
        Reset
      </Button>
    </FormContainer>
  )
}

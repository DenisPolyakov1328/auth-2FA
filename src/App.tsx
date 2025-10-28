import { AuthPage } from './pages/AuthPage.tsx'
import { Flex } from 'antd'

export const App = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: '100vh', backgroundColor: '#F5F5F5' }}
    >
      <AuthPage />
    </Flex>
  )
}

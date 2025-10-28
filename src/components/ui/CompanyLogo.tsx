import { Flex, Typography } from 'antd'

const { Title } = Typography

interface CompanyLogoProps {
  companyName: string
  logoUrl: string
}

export const CompanyLogo = ({ companyName, logoUrl }: CompanyLogoProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      gap="small"
      style={{ margin: '20px 0' }}
    >
      <img src={logoUrl} alt={`Логотип ${companyName}`} />
      <Title level={5} style={{ marginBottom: 0 }}>
        {companyName}
      </Title>
    </Flex>
  )
}

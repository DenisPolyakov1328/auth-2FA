import * as React from 'react'
import { Card } from 'antd'

interface AuthFormContainerProps {
  children: React.ReactNode
  maxWidth?: number
}

export const FormContainer = ({
  children,
  maxWidth = 440,
  ...cardProps
}: AuthFormContainerProps) => {
  return (
    <Card
      variant="borderless"
      style={{
        maxWidth,
        width: '100%'
      }}
      styles={{
        body: {
          width: '100%',
          padding: 32,
          gap: 24
        }
      }}
      {...cardProps}
    >
      {children}
    </Card>
  )
}

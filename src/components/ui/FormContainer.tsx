import * as React from 'react'
import { Card, Grid } from 'antd'

const { useBreakpoint } = Grid

interface FormContainerProps {
  children: React.ReactNode
  maxWidth?: number
}

export const FormContainer = ({
  children,
  maxWidth = 440,
  ...cardProps
}: FormContainerProps) => {
  const screens = useBreakpoint()
  const margin = screens.xs ? 16 : 0

  return (
    <Card
      variant="borderless"
      style={{
        maxWidth,
        width: '100%',
        margin
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

import * as React from 'react'
import { Form } from 'antd'
import { type ReactNode } from 'react'
import type { ZodTypeAny } from 'zod'

interface ZodFormItemProps {
  name: string
  schema: ZodTypeAny
  serverError?: string | null
  children: ReactNode
  style?: React.CSSProperties
}

export const ZodFormItem = ({
  name,
  schema,
  serverError,
  children,
  style
}: ZodFormItemProps) => {
  const validator = (_: any, value: any) => {
    const result = schema.safeParse(value)
    return result.success
      ? Promise.resolve()
      : Promise.reject(result.error.issues[0].message)
  }

  return (
    <Form.Item
      name={name}
      style={style}
      validateStatus={serverError ? 'error' : undefined}
      help={serverError}
      rules={[{ validator }]}
    >
      {children}
    </Form.Item>
  )
}

import { Button, type FormInstance } from 'antd'
import type { ReactNode } from 'react'

interface SubmitButtonProps {
  form: FormInstance
  mounted: boolean
  children: ReactNode
}

export const SubmitButton = ({
  form,
  mounted,
  children
}: SubmitButtonProps) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      size="large"
      block
      disabled={
        !mounted ||
        !form.isFieldsTouched(true) ||
        !!form.getFieldsError().filter(({ errors }) => errors.length).length
      }
    >
      {children}
    </Button>
  )
}

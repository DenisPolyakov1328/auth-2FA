import { useState, useEffect } from 'react'
import { Button, Flex, Form, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader'
import { useVerify2fa } from '../hooks/useVerify2fa.ts'
import { useResendCode } from '../hooks/useResendCode.ts'

interface TwoFactorFormProps {
  expiresIn: number
  onBack: () => void
  onSuccess: () => void
  onExpired: () => void
  sessionId: string
}

export const TwoFactorForm = ({
  expiresIn,
  onBack,
  onSuccess,
  onExpired,
  sessionId
}: TwoFactorFormProps) => {
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(expiresIn)
  const [error, setError] = useState<string | null>(null)

  const verify2faMutation = useVerify2fa()
  const resendCodeMutation = useResendCode()

  const handleSubmit = async () => {
    setError(null)

    try {
      await verify2faMutation.mutateAsync({ sessionId, code })
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Неверный код')
    }
  }

  const handleResend = () => {
    resendCodeMutation.mutate(undefined, {
      onSuccess: (data) => {
        setCode('')
        setError(null)
        setTimeLeft(data.expiresIn)
      },
      onError: (err: any) => {
        setError(err.message || 'Не удалось отправить код')
      }
    })
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpired()
      return
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, onExpired])

  const isCodeComplete = code.length === 6

  return (
    <>
      <Button
        type="text"
        icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
        onClick={onBack}
        style={{ position: 'absolute', width: 40 }}
      />

      <FormHeader showTwoFactorDescription={true} />

      <Flex vertical gap={16} style={{ width: '100%', marginTop: 24 }}>
        <Form.Item
          validateStatus={error ? 'error' : ''}
          help={error ? 'Invalid code' : ''}
          style={{ marginBottom: 0 }}
        >
          <Input.OTP
            value={code}
            onChange={(value) => {
              setCode(value)
              setError(null)
              if (verify2faMutation.isError) verify2faMutation.reset()
            }}
            length={6}
            size="large"
            style={{ columnGap: 12, marginBottom: 6 }}
          />
        </Form.Item>

        {isCodeComplete && timeLeft > 0 && (
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            disabled={verify2faMutation.isError}
          >
            Continue
          </Button>
        )}

        {timeLeft <= 0 && (
          <Button type="primary" size="large" block onClick={handleResend}>
            Get new
          </Button>
        )}
      </Flex>
    </>
  )
}

import { useState, useEffect } from 'react'
import { Button, Flex, Form, Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader'
import { useVerify2fa } from '../hooks/api/useVerify2fa.ts'
import { useResendCode } from '../hooks/api/useResendCode.ts'

interface TwoFactorFormProps {
  expiresIn: number
  onBack: () => void
  onSuccess: () => void
  sessionId: string
}

export const TwoFactorForm = ({
  expiresIn,
  onBack,
  onSuccess,
  sessionId
}: TwoFactorFormProps) => {
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(expiresIn)
  const [error, setError] = useState(false)

  const verify2faMutation = useVerify2fa()
  const resendCodeMutation = useResendCode()

  const handleSubmit = async () => {
    setError(false)
    try {
      await verify2faMutation.mutateAsync({ sessionId, code })
      onSuccess()
    } catch {
      setError(true)
    }
  }

  const handleResend = () => {
    resendCodeMutation.mutate(undefined, {
      onSuccess: (data) => {
        setCode('')
        setError(false)
        setTimeLeft(data.expiresIn)
      },
      onError: () => {
        setError(true)
      }
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
          className="otp-form-item"
          validateStatus={error ? 'error' : ''}
          help={error ? 'Invalid code' : ''}
          style={{ marginBottom: 0 }}
        >
          <Input.OTP
            inputMode="numeric"
            value={code}
            onChange={(value) => {
              setCode(value)
              setError(false)
              if (verify2faMutation.isError) verify2faMutation.reset()
            }}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== 'Backspace' &&
                e.key !== 'Tab'
              ) {
                e.preventDefault()
              }
            }}
            length={6}
            size="large"
            style={{ columnGap: 12 }}
          />
        </Form.Item>

        {timeLeft <= 0 ? (
          <Button type="primary" size="large" block onClick={handleResend}>
            Get new
          </Button>
        ) : (
          isCodeComplete && (
            <Button
              type="primary"
              size="large"
              block
              onClick={handleSubmit}
              disabled={error}
            >
              Continue
            </Button>
          )
        )}
      </Flex>
    </>
  )
}

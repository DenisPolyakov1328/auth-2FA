import { useState, useEffect } from 'react'
import { Button, Flex, Input, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { FormHeader } from './FormHeader'

interface TwoFactorFormProps {
  expiresIn: number
  onBack: () => void
  onSuccess: () => void
  onExpired: () => void
}

export const TwoFactorForm = ({
  expiresIn,
  onBack,
  onSuccess,
  onExpired
}: TwoFactorFormProps) => {
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(expiresIn)
  const [msgApi, contextHolder] = message.useMessage()

  const handleSubmit = () => {
    if (code === '123456') {
      void msgApi.success('Код подтверждён')
      onSuccess()
    } else {
      void msgApi.error('Неверный код')
    }
  }

  const handleResend = () => {
    void msgApi.info('Новый код отправлен')
    setCode('')
    setTimeLeft(expiresIn)
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
      {contextHolder}

      <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} />

      <FormHeader showTwoFactorDescription={true} />

      <Flex vertical gap={16} style={{ width: '100%', marginTop: 20 }}>
        <Input.OTP
          value={code}
          onChange={setCode}
          length={6}
          size="large"
          style={{ columnGap: 12 }}
        />

        {isCodeComplete && timeLeft > 0 && (
          <Button type="primary" size="large" block onClick={handleSubmit}>
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

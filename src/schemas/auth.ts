import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Please enter your email' })
    .email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .nonempty({ message: 'Please enter your password' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/^[a-zA-Z0-9!@#$%^&*]+$/, {
      message: 'Password contains invalid characters'
    })
})

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'Поле обязательно' })
      .min(1, 'Поле обязательно')
      .email('Некорректный email'),
    password: z
      .string({ required_error: 'Поле обязательно' })
      .min(1, 'Поле обязательно')
      .min(6, 'Минимум 6 символов'),
  }),
)

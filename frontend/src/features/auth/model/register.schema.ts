import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const registerSchema = toTypedSchema(
  z
    .object({
      username: z
        .string({ required_error: 'Поле обязательно' })
        .min(1, 'Поле обязательно')
        .min(3, 'Минимум 3 символа'),
      email: z
        .string({ required_error: 'Поле обязательно' })
        .min(1, 'Поле обязательно')
        .email('Некорректный email'),
      password: z
        .string({ required_error: 'Поле обязательно' })
        .min(1, 'Поле обязательно')
        .min(6, 'Минимум 6 символов'),
      confirmPassword: z
        .string({ required_error: 'Поле обязательно' })
        .min(1, 'Поле обязательно'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    }),
)

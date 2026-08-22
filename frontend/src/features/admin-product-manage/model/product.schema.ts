import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const productZodSchema = z.object({
  name: z
    .string({ required_error: 'Название обязательно' })
    .min(1, 'Название обязательно'),
  category: z.enum(['furniture', 'light', 'items', 'accessories'], {
    required_error: 'Выберите категорию',
  }),
  price: z.coerce
    .number({ required_error: 'Укажите цену', invalid_type_error: 'Цена должна быть числом' })
    .positive('Цена должна быть больше 0'),
  inStock: z.boolean().default(true),
  description: z
    .string({ required_error: 'Описание обязательно' })
    .min(1, 'Описание обязательно'),
  imageId: z.number().nullable().optional(),
  imageUrl: z.string().optional(),
})

export const productSchema = toTypedSchema(productZodSchema)

export type ProductFormValues = z.infer<typeof productZodSchema>

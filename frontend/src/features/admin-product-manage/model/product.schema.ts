import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const specItemSchema = z.object({
  title: z.string().min(1, 'Укажите название характеристики'),
  description: z.string().min(1, 'Укажите значение'),
})

export const accordionItemSchema = z.object({
  title: z.string().min(1, 'Укажите заголовок секции'),
  content: z.string().min(1, 'Укажите содержимое'),
})

export const productImageItemSchema = z.object({
  id: z.number().optional(),
  url: z.string(),
})

export type IProductImageItem = z.infer<typeof productImageItemSchema>

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
  images: z.array(productImageItemSchema).default([]),
  specs: z.array(specItemSchema).default([]),
  accordions: z.array(accordionItemSchema).default([]),
})

export const productSchema = toTypedSchema(productZodSchema)

export type ProductFormValues = z.infer<typeof productZodSchema>



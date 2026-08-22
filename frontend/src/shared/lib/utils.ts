import type { IProduct, IStrapiProduct } from '@/entities/product'
import { isAxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export const getStrapiMediaUrl = (url?: string | null): string => {
  if (!url) return 'https://placehold.co/200x300?text=No+Image'
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
    return url
  }
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1337'
  return `${backendUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

export const mapStrapiProductToProduct = ({
  name,
  description,
  price,
  inStock,
  createdAt,
  category,
  images,
  documentId,
  specs,
  accordions,
}: IStrapiProduct): IProduct => {
  const imageUrls =
    images && images.length > 0
      ? images.map((img) => getStrapiMediaUrl(img.url))
      : ['https://placehold.co/200x300?text=No+Image']

  return {
    id: documentId,
    name,
    description,
    price,
    inStock,
    createdAt,
    category,
    image: imageUrls[0] || 'https://placehold.co/200x300?text=No+Image',
    images: imageUrls,
    rawImages: images,
    specs,
    accordions,
  }
}

export const getStrapiErrorMessage = (err: unknown, fallback = 'Произошла ошибка'): string => {
  if (isAxiosError(err) && err.response?.data?.error?.message) {
    const message = err.response.data.error.message

    const errorMap: Record<string, string> = {
      'Invalid identifier or password': 'Неверный E-mail или пароль',
      'Email or Username are already taken': 'Пользователь с таким E-mail уже существует',
      'Your account has been blocked by an administrator': 'Ваш аккаунт заблокирован',
      'Too many requests, please try again later.':
        'Слишком много запросов, пожалуйста, попробуйте позже.',
    }

    return errorMap[message] || message
  }

  return fallback
}

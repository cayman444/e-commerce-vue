import type { IProduct, IStrapiProduct } from '@/entities/product'
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

export const mapStrapiProductToProduct = ({
  name,
  price,
  inStock,
  createdAt,
  category,
  image,
  documentId,
}: IStrapiProduct): IProduct => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1337'

  return {
    id: documentId,
    name,
    price,
    inStock,
    createdAt,
    category,
    image: image ? `${backendUrl}${image.url}` : 'https://placehold.co/200x300?text=No+Image',
  }
}

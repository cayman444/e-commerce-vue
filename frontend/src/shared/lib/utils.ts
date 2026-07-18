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
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1337'

  const imageUrls =
    images && images.length > 0
      ? images.map((img) => `${backendUrl}${img.url}`)
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
    specs,
    accordions,
  }
}

import { apiInstance } from '@/shared/api/client'
import type { IStrapiProduct, IStrapiResponse } from '../model/types'
import type { IProductFilters } from '../model/types'

export const getProductsList = (params: Record<string, unknown>) => {
  return apiInstance.get<IStrapiResponse<IStrapiProduct>>('/products', { params })
}

export const getProductsRequestParams = (filters: IProductFilters) => {
  const params: Record<string, unknown> = {
    populate: 'image',
  }

  if (filters.category !== 'all') {
    params['filters[category][$eq]'] = filters.category
  }

  if (filters.search) {
    params['filters[name][$containsi]'] = filters.search
  }

  params['filters[price][$gte]'] = filters.price.min || undefined
  params['filters[price][$lte]'] = filters.price.max || undefined

  if (filters.inStock) {
    params['filters[inStock][$eq]'] = true
  }

  const sortMap: Record<typeof filters.sort, string> = {
    'price-asc': 'price:asc',
    'price-desc': 'price:desc',
    newest: 'createdAt:desc',
  }
  params['sort'] = sortMap[filters.sort]

  return params
}

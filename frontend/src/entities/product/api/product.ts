import { apiInstance } from '@/shared/api/client'
import type { IProductFilters, IStrapiProduct, IStrapiResponse, TSort } from '../model/types'

export const getProductsList = (params: Record<string, unknown>) => {
  return apiInstance.get<IStrapiResponse<IStrapiProduct>>('/products', { params })
}

export const getProductById = (id: string) => {
  return apiInstance.get<{ data: IStrapiProduct }>('/products/' + id)
}

export const getProductsRequestParams = (filters: IProductFilters) => {
  const params: Record<string, unknown> = {}

  if (filters.category !== 'all') {
    params['filters[category][$eq]'] = filters.category
  }

  if (filters.search) {
    params['filters[name][$containsi]'] = filters.search
  }

  params['filters[price][$gte]'] = filters.minPrice || undefined
  params['filters[price][$lte]'] = filters.maxPrice || undefined

  if (filters.inStock) {
    params['filters[inStock][$eq]'] = true
  }

  const sortMap: Record<TSort, string> = {
    'price-asc': 'price:asc',
    'price-desc': 'price:desc',
    newest: 'createdAt:desc',
  }
  params['sort'] = sortMap[filters.sort]

  return params
}

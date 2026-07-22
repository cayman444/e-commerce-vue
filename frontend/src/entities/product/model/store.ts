import { router } from '@/app/router'
import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { useAsyncState } from '@vueuse/core'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { type LocationQueryRaw, useRoute } from 'vue-router'
import { getProductsList, getProductsRequestParams } from '../api/product'
import { isCategoryFilter, isSortFilter } from './type-guards'
import type { IProduct, IProductFilters } from './types'

export const useProductStore = defineStore('productStore', () => {
  const route = useRoute()
  const filters = computed<IProductFilters>(() => ({
    category: isCategoryFilter(route.query.category) ? route.query.category : 'all',
    search: typeof route.query.search === 'string' ? route.query.search : '',
    minPrice: route.query.minPrice ? +route.query.minPrice : null,
    maxPrice: route.query.maxPrice ? +route.query.maxPrice : null,
    sort: isSortFilter(route.query.sort) ? route.query.sort : 'newest',
    inStock: route.query.inStock === 'true',
  }))

  const {
    state: products,
    isLoading,
    error: rawError,
    execute: fetchProducts,
  } = useAsyncState(
    async () => {
      const params = getProductsRequestParams(filters.value)
      const { data } = await getProductsList(params)

      return data.data.map(mapStrapiProductToProduct)
    },
    [] as IProduct[],
    { immediate: false, resetOnExecute: false },
  )

  const error = computed(() => {
    if (!rawError.value) return null
    return isAxiosError(rawError.value) ? rawError.value.message : 'Ошибка загрузки продуктов'
  })

  const maxProductPrice = computed(() => {
    return [...products.value].sort((a, b) => b.price - a.price)[0]?.price
  })

  const updateFilters = (newParams: Partial<IProductFilters>) => {
    const updatedQuery: LocationQueryRaw = { ...route.query }

    Object.entries(newParams).forEach(([key, value]) => {
      const isDefault =
        value === null ||
        value === undefined ||
        value === '' ||
        (key === 'category' && value === 'all') ||
        (key === 'sort' && value === 'newest') ||
        (key === 'inStock' && value === false)

      if (isDefault) {
        delete updatedQuery[key]
      } else {
        updatedQuery[key] = `${value}`
      }
    })

    router.push({ query: updatedQuery })
  }

  watch(
    () => route.query,
    () => {
      fetchProducts()
    },
    { immediate: true },
  )

  return {
    products,
    isLoading,
    error,
    filters,
    maxProductPrice,
    updateFilters,
    fetchProducts,
  }
})

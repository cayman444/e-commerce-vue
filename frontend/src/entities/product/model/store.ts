import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { useAsyncState } from '@vueuse/core'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { getProductsList, getProductsRequestParams } from '../api/product'
import type { IPriceRange, IProduct, IProductFilters, TCategory, TSort } from './types'

export const useProductStore = defineStore('productStore', () => {
  const filters = reactive<IProductFilters>({
    category: 'all',
    search: '',
    price: {
      min: null,
      max: null,
    },
    sort: 'newest',
    inStock: false,
  })

  const {
    state: products,
    isLoading,
    error: rawError,
    execute: fetchProducts,
  } = useAsyncState(
    async () => {
      const params = getProductsRequestParams(filters)
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

  const setCategory = (newCategory: TCategory) => {
    filters.category = newCategory
  }

  const setPriceRange = (range: IPriceRange) => {
    filters.price = range
  }

  const setSort = (newSort: TSort) => {
    filters.sort = newSort
  }

  const toggleInStock = () => {
    filters.inStock = !filters.inStock
  }

  watch(
    filters,
    () => {
      fetchProducts()
    },
    { deep: true },
  )

  return {
    products,
    isLoading,
    error,
    filters,
    maxProductPrice,
    setCategory,
    setPriceRange,
    setSort,
    toggleInStock,
    fetchProducts,
  }
})

import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { getProductsList, getProductsRequestParams } from '../api/product'
import type {
  IPriceRange,
  IProduct,
  IProductFilters,
  IStrapiProduct,
  IStrapiResponse,
  TCategory,
  TSort,
} from './types'

export const useProductStore = defineStore('productStore', () => {
  const products = ref<IProduct[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

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

  const fetchProducts = async () => {
    try {
      isLoading.value = true
      error.value = null

      const params = getProductsRequestParams(filters)
      const { data } = await getProductsList(params)

      products.value = data.data.map(mapStrapiProductToProduct)
    } catch (err) {
      error.value = isAxiosError(err) ? err.message : 'Ошибка загрузки продуктов'
    } finally {
      isLoading.value = false
    }
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

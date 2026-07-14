import { apiInstance } from '@/shared/api/client'
import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { isAxiosError } from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
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

  const filteredProducts = computed(() => {
    let result = products.value.filter((p) => {
      const isCategoryMatch = filters.category === 'all' || p.category === filters.category
      const isSearchMatch = p.name.toLowerCase().includes(filters.search.toLowerCase())

      let isPriceMatch = true
      if (filters.price.min !== null) {
        isPriceMatch = isPriceMatch && p.price >= filters.price.min
      }
      if (filters.price.max !== null) {
        isPriceMatch = isPriceMatch && p.price <= filters.price.max
      }

      const isInStockMatch = !filters.inStock || p.inStock

      return isCategoryMatch && isSearchMatch && isPriceMatch && isInStockMatch
    })

    if (filters.sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (filters.sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (filters.sort === 'newest') {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    }

    return result
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

      const { data } = await apiInstance.get<IStrapiResponse<IStrapiProduct>>(
        '/products?populate=image',
      )

      products.value = data.data.map(mapStrapiProductToProduct)
    } catch (err) {
      if (isAxiosError(err)) {
        error.value = err.message
      } else {
        error.value = 'Ошибка загрузки продуктов'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    isLoading,
    error,
    filters,
    filteredProducts,
    maxProductPrice,
    setCategory,
    setPriceRange,
    setSort,
    toggleInStock,
    fetchProducts,
  }
})

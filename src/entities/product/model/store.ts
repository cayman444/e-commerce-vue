import { defineStore } from 'pinia'
import { computed, reactive, ref, toRef } from 'vue'
import type { IPriceRange, IProduct, IProductFilters, TCategory, TSort } from './types'

export const useProductStore = defineStore('productStore', () => {
  const products = ref<IProduct[]>([
    {
      id: 1,
      name: 'Скульптурный стул',
      price: 1250,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCGkVm0QfQ7Yavw70R9rVzUz8iKwHb4VFYsgJ460L0PUIRJZdW-BHq8hQtb_Sfdm9v2l2Qnm5BiD6hUqy2a-3EMF1OKC31E3ymXTI4ADLej6Gj1uJ6bnWO7A0t1QkGzt_ctqT80ziGSrddjn9fvVUxBlmUYhe49V_bQgJI_mbGvCo2LCPtpIjn49noJ9wQEmAZqp6ZQP8MFwWzTPgAW7QKNrzjfOMUlOqNhyEsrWbfGYJ5owxeMsQGATr_fswWMESFBMe1ok6uQuro',
      category: 'furniture',
      inStock: true,
      createdAt: '2026-06-01T12:00:00.000Z',
    },
    {
      id: 2,
      name: 'Подвесной светильник Opal',
      price: 890,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCFkDiaGXR9g2N_thNbXHS1iPcuL2dsvGS_DdXeixH3SK8vMCFNXNiddFqj_ANaLjodGOjbAn9nZEaRwo32p_CiCnVDEEbKc5R9ED-_bvJEWPZs_6Z3El6rKXWPvSZLU3I_vYzBdUayhJXj7LAwGsFyC1n8But8i7bSh_LrVgL_XrDZyx_Gd5Yu6TLQTUSHpNuSvmrGebDInXLm0G8PGcQbdifEkUA9EMcrTJb8EuZb8gQxK2zNSQNlWoOQCCgUwnXA3o6OFmKKsCI',
      category: 'light',
      inStock: true,
      createdAt: '2026-07-05T12:00:00.000Z',
    },
    {
      id: 3,
      name: 'Керамическая ваза № 04',
      price: 320,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDVmTZ8HIDyRZM5LShDYFJUFsXV8tAxe-jBCNYPNQKw9Bt1-CCvJybeY-0U3O2k24s-4VXP1oU3MPCbV5MD3hj1t7pTd6RYKhXVn4GI0hUDm5ECSHCyT-8mm-Yo3luRO-hS_gYgCArYF0aXcGRnpi213AsmhUBvap6l7HPmd22QNiQQ6zZeMBVXPcXAnUklMYANli9uNCqU-4TkkTwEXVg6VFskCfJY3wfxDvTU8u1wXCbtXwn5DYoqPaZ2afl7fsDmSEgma-CipmQ',
      category: 'items',
      inStock: false,
      createdAt: '2026-05-15T12:00:00.000Z',
    },
    {
      id: 4,
      name: 'Модульная система Series II',
      price: 4800,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBBR_djugFnWlwYBamhYpVMTJXO4_oqbm1GNG9_6qphfUVWFaHOhDk-DX1MPmPfdVzbhW-CTDtTkoGiH9R9YUZeBQYzpTb3fMUYcrx6_f0I0emojZHUkzALy5NQ5YrBwfBXCPGbN2Ql9LVqiL5pPVE1kZN0_N_29pvJFarnT3jHd6ZOsotj7h5jdsBS-70xvUhCL8QWcsJsQ9223EIskYLKVWo56xwuAPIi0ixFdNzu1FpSqai7IcnAdrLrDsO2xzLzLUhGkWnqYIQ',
      category: 'furniture',
      inStock: true,
      createdAt: '2026-04-20T12:00:00.000Z',
    },
    {
      id: 5,
      name: 'Приставной столик Monolith',
      price: 1100,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCCtM1LsOGu3zP-61T99b2DQ7d4rb1GyVyF5eCVteXzT0LrEtaKVwe85R9KUyE_K1a6mMhzPwWB0UBTXWmVbee3XhUCeD2vFUxFLfbHkjzwZPpfhPueSh3AYLqUajSCsBTYY64v9M8cJM6cD1xbCPoBciFCoAM7ZXHH4sxzsKY1q0dRhEL8J4PJhjwfTeTLkKQfaUcEsl_1Lxg2yYJN7_EYr8k5YnJnyKuqhKS3tK2AuG98GRMepYH2pGvUO2GZb7jNV0b5LdOPZ1g',
      category: 'furniture',
      inStock: false,
      createdAt: '2026-07-01T12:00:00.000Z',
    },
    {
      id: 6,
      name: 'Линейная настольная лампа',
      price: 650,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDPrujnbi4Vrejsum6Oz8L-0aoWbP481yffuJe-TJ54J09qFDjtHQg54-tTTnXc6rp4u6TkCCznC3VzJdO7eFNu1GfiY8k3Ayfyr3gz5IzO2xiK4o7RnqiBeluoasb-o82EpXJyea-mi7xTT8YMseZmD83UUjJQhO057NZoGSIGdha5v_fg8o-zs1hdfbhF1e8O8ky9AoBBmGPUd6JBNNklaVIlg9_uijr_EFDxSydK7fadUvezrtaui6Bl7UgaASvqRNkD193-2ns',
      category: 'light',
      inStock: true,
      createdAt: '2026-06-15T12:00:00.000Z',
    },
  ])

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

  return {
    products,
    filters,
    filteredProducts,
    maxProductPrice,
    setCategory,
    setPriceRange,
    setSort,
    toggleInStock,
  }
})

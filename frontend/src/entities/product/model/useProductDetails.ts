import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { isAxiosError } from 'axios'
import { ref, watch } from 'vue'
import { getProductById } from '../api/product'
import type { IProduct } from './types'

export function useProductDetails(idSource: () => string) {
  const product = ref<IProduct | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchProductDetails = async () => {
    const id = idSource()
    if (!id) return

    try {
      isLoading.value = true
      error.value = null

      const { data } = await getProductById(id)
      product.value = mapStrapiProductToProduct(data.data)
    } catch (err) {
      error.value = isAxiosError(err) ? err.message : 'Не удалось загрузить товар'
    } finally {
      isLoading.value = false
    }
  }

  watch(
    idSource,
    () => {
      fetchProductDetails()
    },
    { immediate: true },
  )

  return {
    product,
    isLoading,
    error,
    fetchProductDetails,
  }
}

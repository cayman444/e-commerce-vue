import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { useAsyncState } from '@vueuse/core'
import { isAxiosError } from 'axios'
import { computed, watch } from 'vue'
import { getProductById } from '../api/product'

export function useProductDetails(idSource: () => string) {
  const {
    state: product,
    isLoading,
    error: rawError,
    execute: fetchProductDetails,
  } = useAsyncState(
    async () => {
      const id = idSource()
      if (!id) return null
      const { data } = await getProductById(id)
      return mapStrapiProductToProduct(data.data)
    },
    null,
    {
      resetOnExecute: false,
    },
  )

  const error = computed(() => {
    if (!rawError.value) return null
    return isAxiosError(rawError.value) ? rawError.value.message : 'Не удалось загрузить товар'
  })

  watch(idSource, () => {
    fetchProductDetails()
  })

  return {
    product,
    isLoading,
    error,
  }
}

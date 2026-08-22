import type { IProduct } from '@/entities/product'
import { deleteProduct } from '@/entities/product'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { ref, type Ref } from 'vue'
import { toast } from 'vue-sonner'

export const useProductDelete = (
  product: Ref<IProduct | null | undefined>,
  onSuccess?: () => void,
) => {
  const isLoading = ref(false)

  const confirmDelete = async () => {
    if (!product.value?.id) return

    isLoading.value = true
    try {
      await deleteProduct(product.value.id)
      toast.success('Товар успешно удален')
      onSuccess?.()
    } catch (err) {
      toast.error(getStrapiErrorMessage(err, 'Ошибка при удалении товара'))
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    confirmDelete,
  }
}

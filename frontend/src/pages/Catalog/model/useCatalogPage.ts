import { router } from '@/app/router'
import { useCartStore } from '@/entities/cart'
import { type IProduct, useProductStore } from '@/entities/product'
import { formatPrice } from '@/shared/lib/utils'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

export const useCatalogPage = () => {
  const route = useRoute()
  const productStore = useProductStore()
  const cartStore = useCartStore()

  const { products, isLoading, error } = storeToRefs(productStore)

  const handleAddToCart = (product: IProduct) => {
    cartStore.addToCart({
      productId: product.id,
      priceForOne: product.price,
      name: product.name,
      image: product.image,
    })

    toast.success(`${product.name} добавлен в корзину`, {
      description: formatPrice(product.price),
      action: {
        label: 'В корзину',
        onClick: () => router.push('/cart'),
      },
    })
  }

  onMounted(() => {
    productStore.fetchProducts()
  })

  watch(
    () => route.query,
    () => {
      productStore.fetchProducts()
    },
  )

  return {
    products,
    isLoading,
    error,
    handleAddToCart,
  }
}

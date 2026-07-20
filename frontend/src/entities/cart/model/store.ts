import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { IAddToCart, IProductsToCart } from './types'

export const useCartStore = defineStore('cart', () => {
  const productsToCart = ref<IProductsToCart[]>(JSON.parse(localStorage.getItem('cart') || '[]'))

  watch(
    productsToCart,
    (newVal) => {
      localStorage.setItem('cart', JSON.stringify(newVal))
    },
    { deep: true },
  )

  const removeFromCart = (productId: string) => {
    const itemIndex = productsToCart.value.findIndex((p) => p.productId === productId)

    if (itemIndex !== -1) {
      productsToCart.value.splice(itemIndex, 1)
    }
  }

  const incrementCountProduct = (productId: string) => {
    const item = productsToCart.value.find((p) => p.productId === productId)

    if (item) item.productCountToCart++
  }

  const decrementCountProduct = (productId: string) => {
    const item = productsToCart.value.find((p) => p.productId === productId)

    if (item && item.productCountToCart > 1) {
      item.productCountToCart--
    }
  }

  const addToCart = ({ productId, image, name, priceForOne }: IAddToCart) => {
    const item = productsToCart.value.find((p) => p.productId === productId)

    if (item) {
      incrementCountProduct(productId)
    } else {
      productsToCart.value.push({ productId, priceForOne, productCountToCart: 1, name, image })
    }
  }

  const totalPrice = computed(() =>
    productsToCart.value.reduce(
      (acc, { priceForOne, productCountToCart }) => acc + priceForOne * productCountToCart,
      0,
    ),
  )

  const totalCount = computed(() =>
    productsToCart.value.reduce((acc, { productCountToCart }) => acc + productCountToCart, 0),
  )

  return {
    productsToCart,
    totalPrice,
    totalCount,
    addToCart,
    removeFromCart,
    incrementCountProduct,
    decrementCountProduct,
  }
})

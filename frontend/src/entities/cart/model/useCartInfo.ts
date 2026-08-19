import { ROUTES_PATHS, router } from '@/app/router'
import { storeToRefs } from 'pinia'
import { useCartStore } from './store'

export const useCartInfo = () => {
  const cartStore = useCartStore()
  const { totalPrice, totalCount } = storeToRefs(cartStore)

  const handleToCart = () => {
    router.push(ROUTES_PATHS.CART)
  }

  return { totalPrice, totalCount, handleToCart }
}

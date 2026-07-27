import { ROUTES_PATHS } from '@/app/router'
import { useCartStore } from '@/entities/cart'
import { useUserStore } from '@/entities/user'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

export const HEADER_NAVIGATION = [
  { to: ROUTES_PATHS.CATALOG, text: 'Каталог' },
  { to: ROUTES_PATHS.ABOUT, text: 'О нас' },
  { to: ROUTES_PATHS.JOURNAL, text: 'Журнал' },
] as const

export const useHeader = () => {
  const router = useRouter()
  const cartStore = useCartStore()
  const userStore = useUserStore()

  const handleLogout = async () => {
    try {
      await userStore.logout()
      toast.success('Вы вышли из системы')
      router.push(ROUTES_PATHS.CATALOG)
    } catch (err) {
      toast.error(getStrapiErrorMessage(err, 'Не удалось выйти из системы'))
    }
  }

  const navigateToLogin = () => router.push(ROUTES_PATHS.LOGIN)
  const navigateToCart = () => router.push(ROUTES_PATHS.CART)
  const navigateToCatalog = () => router.push(ROUTES_PATHS.CATALOG)

  return {
    navigation: HEADER_NAVIGATION,
    userStore,
    cartStore,
    handleLogout,
    navigateToLogin,
    navigateToCart,
    navigateToCatalog,
  }
}

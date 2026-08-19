import { ROUTES_PATHS, router } from '@/app/router'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useUserStore } from './store'

export const usePersonalInfo = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const isLoaded = ref(false)

  const handleLogout = async () => {
    try {
      await userStore.logout()

      toast.success('Вы вышли из системы')
      router.push(ROUTES_PATHS.CATALOG)
    } catch (err) {
      toast.error(getStrapiErrorMessage(err, 'Не удалось выйти из системы'))
    }
  }

  return { user, isLoaded, handleLogout }
}

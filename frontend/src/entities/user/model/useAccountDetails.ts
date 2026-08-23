import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from './store'

export const useAccountDetails = () => {
  const userStore = useUserStore()
  const { user, isAdmin } = storeToRefs(userStore)

  const formattedCreatedAt = computed(() => {
    if (!user.value?.createdAt) return '—'
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(user.value.createdAt))
  })

  const roleTitle = computed(() => {
    if (isAdmin.value) return 'Администратор'
    return user.value?.role?.name || 'Покупатель'
  })

  return {
    user,
    isAdmin,
    formattedCreatedAt,
    roleTitle,
  }
}

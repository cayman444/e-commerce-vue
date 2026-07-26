import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMeApi, loginApi, refreshTokenApi, registerApi } from '../api/auth'
import type { ILoginPayload, IRegisterPayload, IUser } from './types'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const accessToken = ref<string | null>(null)
  const isInitialLoading = ref(true)

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

  const login = async (payload: ILoginPayload) => {
    const { data } = await loginApi(payload)
    user.value = data.user
    accessToken.value = data.jwt

    return data
  }

  const register = async (payload: IRegisterPayload) => {
    const { data } = await registerApi(payload)
    user.value = data.user
    accessToken.value = data.jwt

    return data
  }

  const initAuth = async () => {
    isInitialLoading.value = true
    try {
      const { data } = await refreshTokenApi()
      accessToken.value = data.jwt

      const meRes = await getMeApi()
      user.value = meRes.data
    } catch {
      user.value = null
      accessToken.value = null
    } finally {
      isInitialLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
  }

  return {
    user,
    accessToken,
    isInitialLoading,
    isAuthenticated,
    login,
    register,
    initAuth,
    logout,
  }
})

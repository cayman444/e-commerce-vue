import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMeApi, loginApi, logoutApi, refreshTokenApi, registerApi } from '../api/auth'
import type { ILoginPayload, IRegisterPayload, IUser } from './types'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const accessToken = ref<string | null>(null)
  const isInitialLoading = ref(true)

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const isAdmin = computed(() => user.value?.role?.type === 'admin')

  const login = async (payload: ILoginPayload) => {
    const { data } = await loginApi(payload)
    accessToken.value = data.jwt

    const meRes = await getMeApi()
    user.value = meRes.data

    return data
  }

  const register = async (payload: IRegisterPayload) => {
    const { data } = await registerApi(payload)
    accessToken.value = data.jwt

    const meRes = await getMeApi()
    user.value = meRes.data

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

  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      user.value = null
      accessToken.value = null
    }
  }

  return {
    user,
    accessToken,
    isInitialLoading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    initAuth,
    logout,
  }
})

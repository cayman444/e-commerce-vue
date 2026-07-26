import { useUserStore } from '@/entities/user'
import axios from 'axios'

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

apiInstance.interceptors.request.use((config) => {
  const userStore = useUserStore()

  if (userStore.accessToken) {
    config.headers.Authorization = `Bearer ${userStore.accessToken}`
  }

  return config
})

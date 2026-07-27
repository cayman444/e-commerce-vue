import { apiInstance } from '@/shared/api/client'
import type { IAuthResponse, ILoginPayload, IRegisterPayload, IUser } from '../model/types'

export const loginApi = (payload: ILoginPayload) => {
  return apiInstance.post<Omit<IAuthResponse, 'refreshToken'>>('/auth/local', payload)
}

export const registerApi = (payload: IRegisterPayload) => {
  return apiInstance.post<IAuthResponse>('/auth/local/register', payload)
}

export const logoutApi = () => {
  return apiInstance.post<{ ok: boolean }>('/auth/logout')
}

export const refreshTokenApi = () => {
  return apiInstance.post<{ jwt: string }>('/auth/refresh')
}

export const getMeApi = () => {
  return apiInstance.get<IUser>('/users/me')
}

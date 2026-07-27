export interface IUser {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  role?: {
    id: number
    documentId: string
    name: string
    description: string
    type: TUserRole
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export type TUserRole = 'authenticated' | 'public' | 'admin'

export interface IAuthResponse {
  jwt: string
  refreshToken: string
  user: IUser
}

export interface ILoginPayload {
  identifier: string
  password: string
}

export interface IRegisterPayload {
  username: string
  email: string
  password: string
}

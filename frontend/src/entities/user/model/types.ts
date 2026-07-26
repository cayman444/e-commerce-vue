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
}

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

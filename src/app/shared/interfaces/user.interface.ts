export interface User {
  userID?: string
  token: string
  name: string
  lastName?: string
  email: string
  offMail?: string
  gender?: string
  number?: string
  password: string
  avatar?: string
  role?: string
  salary?: number
  designation?: string
}

export interface StaffMiniList{
  name: string
  id: string
}
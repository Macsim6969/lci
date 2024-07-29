export interface Notification{
  id: number
  sendTo: string
  sendFrom: string
  title: string
  description: string
  date: Date
  read: boolean
  avatar?: string
}
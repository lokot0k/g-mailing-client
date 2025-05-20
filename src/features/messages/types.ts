export interface Message {
  id: number
  subject: string
  body: string
  is_read: boolean
  created_at: string
  sender: {
    id: number
    email: string
  }
  recipient: {
    id: number
    email: string
  }
} 

export interface MessagesState {
  inbox: Message[]
  sent: Message[]
  loading: boolean
  error: string | null
}
  
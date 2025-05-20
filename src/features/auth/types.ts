export interface AuthState {
  token: string | null
  userId: number | null
  error: string | null
  loading: boolean
}
  
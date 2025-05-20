import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'
import { AuthState } from './types'

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
}

interface Credentials { email: string; password: string }

// регистрация
export const register = createAsyncThunk(
  'auth/register',
  async (creds: Credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/register', creds)
      return res.data.token as string
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.error || e.message)
    }
  }
)

// логин
export const login = createAsyncThunk(
  'auth/login',
  async (creds: Credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/login', creds)
      return res.data.token as string
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.error || e.message)
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.userId = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', action.payload)
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        localStorage.setItem('token', action.payload)
      })
      .addCase(register.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
      .addCase(login.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export const { logout } = slice.actions
export default slice.reducer

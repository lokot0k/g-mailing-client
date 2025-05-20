import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'
import { MessagesState, Message } from './types'

const initialState: MessagesState = {
  inbox: [],
  sent: [],
  loading: false,
  error: null,
}

// получить входящие
export const fetchInbox = createAsyncThunk(
  'messages/fetchInbox',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<Message[]>('/messages/inbox')
      return res.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.error || e.message)
    }
  }
)

// получить отправленные
export const fetchSent = createAsyncThunk(
  'messages/fetchSent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<Message[]>('/messages/sent')
      return res.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.error || e.message)
    }
  }
)

// отправить
interface SendPayload { recipient_email: string; subject: string; body: string }
export const sendMessage = createAsyncThunk(
  'messages/send',
  async (payload: SendPayload, { rejectWithValue }) => {
    try {
      const res = await api.post<Message>('/messages/send', payload)
      return res.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.error || e.message)
    }
  }
)

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInbox.pending, state => { state.loading = true; state.error = null })
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.loading = false; state.inbox = action.payload
      })
      .addCase(fetchInbox.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })

      .addCase(fetchSent.pending, state => { state.loading = true; state.error = null })
      .addCase(fetchSent.fulfilled, (state, action) => {
        state.loading = false; state.sent = action.payload
      })
      .addCase(fetchSent.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })

      .addCase(sendMessage.pending, state => { state.loading = true; state.error = null })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false; state.sent.unshift(action.payload)
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false; state.error = action.payload as string
      })
  },
})

export default slice.reducer

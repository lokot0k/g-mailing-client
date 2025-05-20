// src/pages/Sent.tsx
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchSent } from '../features/messages/messageSlice'

export function Sent() {
  const dispatch = useAppDispatch()
  const { sent, loading, error } = useAppSelector(s => s.messages)

  useEffect(() => {
    dispatch(fetchSent())
  }, [dispatch])

  return (
    <div className="container">
      <h1>Sent</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="msg-list">
        {sent.map(msg => (
          <li key={msg.id} className="card">
            <div className="msg-header">
              <span className="from-to">To {msg.recipient.email}</span>
              <span className="date">
                {new Date(msg.created_at).toLocaleString()}
              </span>
            </div>
            <div className="msg-subject">{msg.subject}</div>
            <div className="msg-body">{msg.body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

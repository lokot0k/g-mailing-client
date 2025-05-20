// src/pages/Inbox.tsx
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchInbox } from '../features/messages/messageSlice'

export function Inbox() {
  const dispatch = useAppDispatch()
  const { inbox, loading, error } = useAppSelector(s => s.messages)

  useEffect(() => {
    dispatch(fetchInbox())
  }, [dispatch])

  return (
    <div className="container">
      <h1>Inbox</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="msg-list">
        {inbox.map(msg => (
          <li key={msg.id} className="card">
            <div className="msg-header">
              <span className="from-to">From {msg.sender.email}</span>
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

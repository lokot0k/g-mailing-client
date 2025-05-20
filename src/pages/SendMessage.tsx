import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { sendMessage } from '../features/messages/messageSlice'
import { Navigate, Link } from 'react-router-dom'

export function SendMessage() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(s => s.auth)
  const { loading, error } = useAppSelector(s => s.messages)
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  if (!token) return <Navigate to="/login" />

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(sendMessage({ recipient_email: email, subject, body }))
  }

  return (
    <div className="form">
      <h1>Send Message</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Recipient Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/inbox" className="link">
          ← Back to Inbox
        </Link>
      </p>
    </div>
  )
}

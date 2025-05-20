import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../features/auth/authSlice'
import { Navigate, Link } from 'react-router-dom'

export function Login() {
  const dispatch = useAppDispatch()
  const { token, loading, error } = useAppSelector(s => s.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (token) return <Navigate to="/inbox" />

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className="form">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Нет аккаунта?{' '}
        <Link to="/register" className="link">
          Register
        </Link>
      </p>
    </div>
  )
}

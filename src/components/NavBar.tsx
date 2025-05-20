// src/components/NavBar.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'

export function NavBar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token } = useAppSelector(s => s.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })  // перекидываем на логин
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="link">MailApp</Link>
        <div>
          {token ? (
            <>
              <Link to="/inbox" className="link">Inbox</Link>
              <Link to="/sent" className="link">Sent</Link>
              <Link to="/send" className="link">Send</Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/register" className="link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

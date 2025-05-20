// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { RequireAuth } from './components/RequireAuth'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Inbox } from './pages/Inbox'
import { Sent } from './pages/Sent'
import { SendMessage } from './pages/SendMessage'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/inbox" replace />} />

          {/* публичные */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* защищённые */}
          <Route
            path="/inbox"
            element={
              <RequireAuth>
                <Inbox />
              </RequireAuth>
            }
          />
          <Route
            path="/sent"
            element={
              <RequireAuth>
                <Sent />
              </RequireAuth>
            }
          />
          <Route
            path="/send"
            element={
              <RequireAuth>
                <SendMessage />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

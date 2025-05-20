import { ReactElement } from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
  children: ReactElement
}

export function RequireAuth({ children }: Props) {
  const token = useAppSelector(state => state.auth.token)
  const location = useLocation()

  if (!token) {
    // если не залогинен — редирект на логин
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

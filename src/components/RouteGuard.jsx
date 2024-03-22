import { useEffect } from 'react'
import { useAuth } from '../hooks/auth'

export const RouteGuard = ({ children }) => {
    const { studentInfo } = useAuth()

    useEffect(() => {}, [studentInfo])

    return children
}

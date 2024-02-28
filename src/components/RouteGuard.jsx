import { useEffect } from 'react'
import { useAuth } from '../hooks/authHooks'

export const RouteGuard = ({ children }) => {
    const { studentInfo } = useAuth()

    useEffect(() => {}, [studentInfo])

    return children
}

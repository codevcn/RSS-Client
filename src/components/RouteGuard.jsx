import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminRoutes } from '../configs/routes'
import { useAuth } from '../hooks/auth'
import { useToast } from '../hooks/toast'
import { AUTH_STATUS_AUTHENTICATED, AUTH_STATUS_NOT_AUTHENTICATED } from '../utils/constants/auth'
import { ROLE_ADMIN } from '../utils/constants/role'
import { checkRoutesPattern } from '../utils/route'
import { PageLoading } from './PageLoading'

const Guard = ({ children }) => {
    const { authStatus, accountInfo } = useAuth()
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const checkUserRoleIsAdmin = () => {
        return accountInfo.role.toUpperCase() === ROLE_ADMIN
    }

    const checkAuthRoute = () => {
        if (authStatus === AUTH_STATUS_AUTHENTICATED) {
            if (checkRoutesPattern(location.pathname, adminRoutes) && !checkUserRoleIsAdmin()) {
                navigate('/login/admin')
                toast.error('Người dùng không có quyền truy cập tài nguyên!')
            } else {
                setIsValid(true)
            }
        } else if (authStatus === AUTH_STATUS_NOT_AUTHENTICATED) {
            navigate('/')
            toast.error('Người dùng không được ủy quyền hoặc phiên đăng nhập hết hạn!')
        }
    }

    useEffect(() => {
        checkAuthRoute()
    }, [authStatus])

    if (!isValid) {
        return <PageLoading />
    }

    return children
}

export const RouteGuard = ({ children, nonGuardRoutes }) => {
    const location = useLocation()

    if (checkRoutesPattern(location.pathname, nonGuardRoutes)) {
        return children
    }

    return <Guard>{children}</Guard>
}

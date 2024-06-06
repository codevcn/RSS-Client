import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminRoutes, studentRoutes } from '../configs/routes'
import { useAuth } from '../hooks/auth'
import { useToast } from '../hooks/toast'
import {
    AUTH_STATUS_AUTHENTICATED,
    AUTH_STATUS_IS_LOGOUTED,
    AUTH_STATUS_NOT_AUTHENTICATED,
} from '../utils/constants/auth'
import { ROLE_ADMIN, ROLE_STUDENT } from '../utils/constants/role'
import { checkRoutesPattern } from '../utils/route'
import { PageLoading } from './PageLoading'

const Guard = ({ children, currentRoute }) => {
    const { authStatus, accountInfo } = useAuth()
    const [isValid, setIsValid] = useState(false)
    const [preRoute, setPreRoute] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const checkUserRoleIsAdmin = () => {
        return accountInfo.role.toUpperCase() === ROLE_ADMIN
    }

    const checkUserRoleIsStudent = () => {
        return accountInfo.role.toUpperCase() === ROLE_STUDENT
    }

    const checkAuthRoute = () => {
        if (authStatus === AUTH_STATUS_AUTHENTICATED) {
            if (checkRoutesPattern(location.pathname, adminRoutes) && !checkUserRoleIsAdmin()) {
                navigate('/login/admin')
                toast.error('Người dùng không có quyền truy cập tài nguyên!')
            } else if (
                checkRoutesPattern(location.pathname, studentRoutes) &&
                !checkUserRoleIsStudent()
            ) {
                navigate('/login')
                toast.error('Người dùng không có quyền truy cập tài nguyên!')
            } else {
                setIsValid(true)
                setPreRoute(currentRoute)
            }
        } else if (authStatus === AUTH_STATUS_NOT_AUTHENTICATED) {
            navigate('/')
            toast.error('Người dùng không được ủy quyền hoặc phiên đăng nhập hết hạn!')
        } else if (authStatus === AUTH_STATUS_IS_LOGOUTED) {
            window.location.href = '/'
        }
    }

    useEffect(() => {
        checkAuthRoute()
    }, [authStatus, currentRoute])

    if (isValid && currentRoute === preRoute) {
        return children
    }

    return <PageLoading />
}

export const RouteGuard = ({ children, nonGuardRoutes }) => {
    const { pathname } = useLocation()

    if (checkRoutesPattern(pathname, nonGuardRoutes)) {
        return children
    }

    return <Guard currentRoute={pathname}>{children}</Guard>
}

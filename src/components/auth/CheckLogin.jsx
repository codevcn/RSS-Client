import { PageLoading } from '../../components/PageLoading'
import { useAuth } from '../../hooks/auth'
import { AUTH_STATUS_AUTHENTICATED } from '../../utils/constants/auth'
import './CheckLogin.scss'

const Message = () => {
    return (
        <div className="CheckLogin-Message">
            <i className="bi bi-check"></i>
            <p>Bạn đã đăng nhập!</p>
        </div>
    )
}

export const CheckLogin = ({ children }) => {
    const { authStatus } = useAuth()

    if (authStatus === null) {
        return <PageLoading />
    } else if (authStatus === AUTH_STATUS_AUTHENTICATED) {
        return <Message />
    }

    return children
}

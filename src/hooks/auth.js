import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth as checkAuh_action } from '../redux/actions/authActions'

export const useAuth = () => {
    const { authStatus, accountInfo } = useSelector(({ auth }) => auth)
    const dispatch = useDispatch()

    const checkAuh = async () => {
        if (authStatus === null) {
            dispatch(checkAuh_action())
        }
    }

    useEffect(() => {
        checkAuh()
    }, [])

    return { authStatus, accountInfo }
}

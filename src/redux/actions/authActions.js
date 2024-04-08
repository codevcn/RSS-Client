import { authService } from '../../services/AuthService'
import { ROLE_ADMIN, ROLE_STUDENT } from '../../utils/constants/role'
import { adminSlice, setAdminInfo } from '../reducers/adminReducers'
import { checkAuthFail, checkAuthSuccess, setAccountInfo } from '../reducers/authReducers'
import { setStudentInfo, studentSlice } from '../reducers/studentReducer'

export const checkAuth = () => async (dispatch, getState) => {
    let data
    try {
        data = await authService.checkAuth()
    } catch (error) {
        dispatch(checkAuthFail())
        return
    }
    dispatch(checkAuthSuccess())
    if (
        data.accountInfo.role === ROLE_STUDENT &&
        getState()[studentSlice.name].studentInfo === null
    ) {
        dispatch(setStudentInfo(data.userInfo))
    } else if (
        data.accountInfo.role === ROLE_ADMIN &&
        getState()[adminSlice.name].adminInfo === null
    ) {
        dispatch(setAdminInfo(data.userInfo))
    }
    dispatch(setAccountInfo(data.accountInfo))
}

import { studentService } from '../../services/StudentService'
import { checkAuthFail, checkAuthSuccess } from '../reducers/authReducers'
import { setStudentInfo, studentSlice } from '../reducers/studentReducer'

export const getStudentInfo = () => async (dispatch, getState) => {
    try {
        const { data } = await studentService.getStudentInfo()
        if (data) {
            dispatch(checkAuthSuccess())
            if (getState()[studentSlice.name].studentInfo === null) {
                dispatch(setStudentInfo(data))
            }
        }
    } catch (error) {
        dispatch(checkAuthFail())
    }
}

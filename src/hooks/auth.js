import { useEffect, useState } from 'react'
import { studentService } from '../services/studentService'

export const useAuth = () => {
    const [userInfo, setStudentInfo] = useState(null)

    const checkAuh = async () => {
        const userInfo = studentService.getStudentInfo()
        if (userInfo) setStudentInfo(userInfo)
    }

    useEffect(() => {
        checkAuh()
    }, [])

    return { userInfo }
}

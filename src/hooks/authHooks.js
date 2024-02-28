import { useEffect, useState } from 'react'
import { studentService } from '../services/StudentService'

export const useAuth = () => {
    const [studentInfo, setStudentInfo] = useState(null)

    const checkAuh = async () => {
        const studentInfo = studentService.getStudentInfo()
        if (studentInfo) setStudentInfo(studentInfo)
    }

    useEffect(() => {
        checkAuh()
    }, [])

    return { studentInfo }
}

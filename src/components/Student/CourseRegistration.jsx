import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'
import './CourseRegistration.scss'

const CourseRegistration = () => {
    const navigator = useNavigate()
    const [student, setStudent] = useState({})
    const [currentUser, setCurrentUser] = useState(null)
    const [courses, setCourses] = useState([])

    const handleReturnButtonClick = () => {
        navigator(-1)
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('currentUser')
            const userObj = JSON.parse(storedUser)
            setCurrentUser(userObj)
            studentService
                .findStudentByUserName(userObj.username)
                .then((response) => {
                    setStudent(response.data)
                    console.log('student: ', student.major?.name)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchUserData()
    }, [])

    useEffect(() => {
        getAllRegisteredCourses()
    }, [])

    const getAllRegisteredCourses = async () => {
        try {
            const response = await studentService.getAllRegistration()
            setCourses(response.data)
            console.log('Khoá học:', response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="DetailChangeRegistration">
            <h2>Danh sách môn học đã đăng ký của sinh viên</h2>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
            </div>
            <div className="container">
                <div className="student-info">
                    <h3>Thông tin sinh viên</h3>
                    <p>
                        <strong>Mã sinh viên:</strong> {student.studentCode}
                    </p>
                    <p>
                        <strong>Họ và tên:</strong> {student.fullName}
                    </p>
                    <p>
                        <strong>Giới tính:</strong> {student.gender}
                    </p>
                    <p>
                        <strong>Ngày sinh:</strong> {student.birthday}
                    </p>
                    <p>
                        <strong>Căn cước công dân:</strong> {student.idcard}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong> {student.phone}
                    </p>
                    <p>
                        <strong>Ngành học:</strong> {student.major?.name}
                    </p>
                </div>
                <div className="registered-courses">
                    <h3>Danh sách môn học</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã môn</th>
                                <th>Tên môn học</th>
                                <th>Số tín</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => {
                                if (course.studentID === student.id) {
                                    return (
                                        <tr key={course.subjectCode}>
                                            <td>{index + 1}</td>
                                            <td>{course.subjectCode}</td>
                                            <td>{course.subjectName}</td>
                                            <td>{course.creditsCount}</td>
                                        </tr>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CourseRegistration

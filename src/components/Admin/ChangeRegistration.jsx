import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'
import StudentDetailModal from '../Student/StudentDetailModal'
import StudentUpdateModal from '../Student/StudentUpdateModal'
import './ChangeRegistration.scss'

const ChangeRegistration = () => {
    const [student, setStudent] = useState([])
    const [allstudents, setAllStudents] = useState([])
    const [updateTrigger, setUpdateTrigger] = useState(false)
    const [courses, setCourses] = useState([])

    const navigator = useNavigate()

    //Xem
    const [showModal, setShowModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})

    //Sửa
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    useEffect(() => {
        setStudent(student)
    }, [student])

    useEffect(() => {
        getAllStudent()
    }, [updateTrigger])

    useEffect(() => {
        studentService
            .getStudentInfo()
            .then((response) => {
                setStudent(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        getAllRegisteredCourses()
    }, [])

    const getAllRegisteredCourses = async () => {
        try {
            const response = await studentService.getAllRegistration()
            //console.log("response.data: ", response.data)
            setCourses(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getAllStudent = () => {
        studentService
            .getAllStudent()
            .then((response) => {
                setAllStudents(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleUpdateStudent = (updatedStudent) => {
        const updatedStudentIndex = student.findIndex((stu) => stu.id === updatedStudent.id)
        const updatedStudentList = [...student]
        updatedStudentList[updatedStudentIndex] = updatedStudent
        setStudent(updatedStudentList)
    }

    //Xem
    function showStudentDetail(student) {
        setSelectedStudent(student)
        setShowModal(true)
    }

    const handleReturnButtonClick = () => {
        navigator(-1)
    }

    const handleCourseRegistrationClick = (studentId) => {
        const registeredCourses = courses.filter((course) => course.studentID === studentId)
        navigator(`/admin/change-course-registration/${studentId}`, {
            state: { registeredCourses },
        })
    }

    return (
        <div className="ChangeRegistration">
            <h2>Điều chỉnh đăng ký môn của sinh viên</h2>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
            </div>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Căn cước công dân</th>
                        <th>Số điện thoại</th>
                        <th>Mã ngành</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((student) => (
                        <tr key={student.studentCode}>
                            <td>{student.studentCode}</td>
                            <td>{student.fullName}</td>
                            <td>{student.gender}</td>
                            <td>{student.birthday}</td>
                            <td>{student.idcard}</td>
                            <td>{student.phone}</td>
                            <td>{student.major.name}</td>
                            <td>
                                <Button
                                    className="watch-button"
                                    onClick={() => showStudentDetail(student)}
                                >
                                    Xem
                                </Button>
                                <Button
                                    className="edit-button"
                                    onClick={() => handleCourseRegistrationClick(student.id)}
                                >
                                    Môn học đã đăng ký
                                </Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <StudentDetailModal
                show={showModal}
                onHide={() => setShowModal(false)}
                student={selectedStudent}
            />
            <StudentUpdateModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                student={selectedStudent}
                onUpdate={handleUpdateStudent}
            />
        </div>
    )
}

export default ChangeRegistration

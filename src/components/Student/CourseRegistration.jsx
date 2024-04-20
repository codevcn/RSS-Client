import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'
import './CourseRegistration.scss'

const CourseRegistration = () => {
    const navigator = useNavigate()

    const [student, setStudent] = useState({})

    const [currentUser, setCurrentUser] = useState(null)

    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    const [selectedCourse, setSelectedCourse] = useState(null)

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

    const showConfirmation = (course) => {
        setSelectedCourse(course)
        setShowConfirmationModal(true)
    }

    // const confirmDeleteCourse = () => {
    //     studentService
    //         .deleteCourseInfor(selectedCourse.receiptSubjectID)
    //         .then(() => {
    //             toast.success('Huỷ thành công')
    //             setSelectedCourse(
    //                 courses.filter((item) => item.id !== selectedCourse.receiptSubjectID)
    //             )
    //             getAllRegisteredCourses()
    //         })
    //         .finally(() => {
    //             setShowConfirmationModal(false)
    //         })
    // }
    const confirmDeleteCourse = async () => {
        try {
            await studentService.deleteCourseInfor(selectedCourse.receiptSubjectID)
            toast.success('Huỷ thành công')
            setCourses((prevCourses) =>
                prevCourses.filter(
                    (item) => item.receiptSubjectID !== selectedCourse.receiptSubjectID
                )
            )
            setShowConfirmationModal(false)
        } catch (error) {
            console.error(error)
            toast.error('Đã có lỗi xảy ra khi huỷ môn học')
        }
    }

    return (
        <div className="DetailChangeRegistration">
            <h2>Điều chỉnh đăng ký môn cho sinh viên</h2>
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
                    <h3>Môn học đã đăng ký</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã môn</th>
                                <th>Tên môn học</th>
                                <th>Số tín</th>
                                <th>Thao tác</th>
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
                                            <td>
                                                <Button
                                                    className="delete-button"
                                                    onClick={() => showConfirmation(course)}
                                                >
                                                    Huỷ
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </tbody>
                    </table>
                    <Modal
                        show={showConfirmationModal}
                        onHide={() => setShowConfirmationModal(false)}
                        style={{ marginTop: '180px', borderRadius: '10px' }}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Xác nhận huỷ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn huỷ môn học này không?</Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                Hủy
                            </Button>
                            <Button variant="primary" onClick={confirmDeleteCourse}>
                                Xác nhận huỷ
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default CourseRegistration

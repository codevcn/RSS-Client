import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import StudentAddModal from './StudentAddModal'
import StudentDetailModal from './StudentDetailModal'
import './StudentManagement.scss'
import StudentUpdateModal from './StudentUpdateModal'

const StudentSection = ({ onUpdate, onHide }) => {
    const [student, setStudent] = useState([])
    const [allstudents, setAllStudents] = useState([])

    const navigator = useNavigate()

    //Xem
    const [showModal, setShowModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})

    //Sửa
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    //Ẩn
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    //Thêm
    const [showAddModal, setShowAddModal] = useState(false)

    useEffect(() => {
        setStudent(student)
    }, [student])

    useEffect(() => {
        getAllStudent()
    }, [])

    useEffect(() => {
        studentService
            .getStudentInfo()
            .then((response) => {
                setStudent(response.data)
                //console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const getAllStudent = () => {
        studentService
            .getAllStudent()
            .then((response) => {
                setAllStudents(response.data)
                //console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function hideStudent(selectedStudent) {
        setSelectedStudent(selectedStudent)
        setShowConfirmationModal(true) // Hiển thị modal xác nhận khi ấn nút ẩn
    }

    const confirmHideStudent = async () => {
        console.log('ID sinh viên được xoá: ', selectedStudent.id)
        await studentService
            .hideStudentInfo(selectedStudent.id, {
                deleted: 'True',
            })
            .then(() => {
                setShowConfirmationModal(false) // Ẩn modal xác nhận
                toast.success('Cập nhật thành công')
                window.location.reload()
                onUpdate(setStudent)
                onHide()
            })
            .catch((error) => {
                onHide() // Ẩn modal chỉnh sửa
                navigator('/student/infor')
                const errorHandler = new HttpRequestErrorHandler(error)
                errorHandler.handleAxiosError()
                toast.error(errorHandler.message)
            })
    }

    function cancelHideStudent() {
        setShowConfirmationModal(false) // Ẩn modal xác nhận
    }

    //Xem
    function showStudentDetail(student) {
        setSelectedStudent(student)
        setShowModal(true)
    }

    //Sửa
    function showStudentUpdateModal(student) {
        setSelectedStudent(student)
        setShowUpdateModal(true)
    }

    //Thêm
    function addStudentUpdateModal(student) {
        setSelectedStudent(student)
        setShowAddModal(true)
    }

    return (
        <div className="StudentSection">
            <h2>Quản lý thông tin sinh viên</h2>

            <button className="add-button" onClick={() => addStudentUpdateModal(student)}>
                + Thêm sinh viên
            </button>

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
                        <tr key={student.id}>
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
                                    onClick={() => showStudentUpdateModal(student)}
                                >
                                    Chỉnh sửa
                                </Button>{' '}
                                <Button
                                    className="hidden-button"
                                    //onClick={() => hideStudent(student.id)}
                                    onClick={() => hideStudent(student)}
                                >
                                    Ẩn
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showConfirmationModal} onHide={cancelHideStudent} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận ẩn sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn ẩn sinh viên khỏi danh sách không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="no-button" onClick={cancelHideStudent}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={confirmHideStudent}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
            <StudentDetailModal
                show={showModal}
                onHide={() => setShowModal(false)}
                student={selectedStudent}
            />
            <StudentUpdateModal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                student={selectedStudent}
                students={allstudents}
            />
            <StudentAddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                student={selectedStudent}
                students={allstudents}
            />
        </div>
    )
}

export default StudentSection

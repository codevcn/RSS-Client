import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'
import StudentAddModal from './StudentAddModal'
import StudentDetailModal from './StudentDetailModal'
import './StudentManagement.scss'
import StudentUpdateModal from './StudentUpdateModal'

const StudentSection = () => {
    const [student, setStudent] = useState([])

    const navigator = useNavigate()

    //Xem
    const [showModal, setShowModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})

    //Sửa
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    //Ẩn
    const [showConfirmationModal, setShowConfirmationModal] = useState(false) // State để điều khiển hiển thị modal xác nhận

    //Thêm
    const [showAddModal, setShowAddModal] = useState(false)

    const handleShowAddModal = () => {
        setShowAddModal(true)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
    }

    const handleAddStudent = (newStudentData) => {}

    useEffect(() => {
        studentService
            .getStudentInfo()
            .then((response) => {
                setStudent(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    function addStudent() {
        navigator('/student/add')
    }

    function updateStudent(id) {
        navigator(`/student/update/${id}`)
    }

    function hideStudent(id) {
        setSelectedStudent(id)
        setShowConfirmationModal(true) // Hiển thị modal xác nhận khi ấn nút ẩn
    }

    function confirmHideStudent() {
        studentService
            .hideStudent(selectedStudent)
            .then(() => {
                setStudent(student.filter((std) => std.id !== selectedStudent)) // Cập nhật danh sách sinh viên sau khi ẩn
                setShowConfirmationModal(false) // Ẩn modal xác nhận
            })
            .catch((error) => {
                console.error(error)
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

    return (
        <div className="StudentSection">
            <h2>Quản lý thông tin sinh viên</h2>

            <button className="add-button" onClick={handleShowAddModal}>
                + Thêm sinh viên
            </button>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
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
                            <td>{student.phone}</td>
                            <td>{student.major}</td>
                            <td>
                                <Button
                                    className="watch-button"
                                    onClick={() => showStudentDetail(student)}
                                >
                                    Xem
                                </Button>
                                <Button
                                    className="edit-button"
                                    //onClick={() => updateStudent(student.id)}
                                    onClick={() => showStudentUpdateModal(student)}
                                >
                                    Chỉnh sửa
                                </Button>{' '}
                                <Button
                                    className="hidden-button"
                                    onClick={() => hideStudent(student.id)}
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
            />
            <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
                <StudentAddModal
                    show={showAddModal}
                    onHide={handleCloseAddModal}
                    onAdd={handleAddStudent}
                />
            </Modal>
        </div>
    )
}

export default StudentSection

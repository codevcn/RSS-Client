import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'
import StudentAddModal from './StudentAddModal'
import StudentDetailModal from './StudentDetailModal'
import './StudentManagement.scss'
import StudentUpdateModal from './StudentUpdateModal'

const StudentSection = () => {
    const [student, setStudent] = useState([])
    const [studentId, setStudentId] = useState(null)
    const [allstudents, setAllStudents] = useState([])
    const [allaccounts, setAllAccounts] = useState([])
    const [updateTrigger, setUpdateTrigger] = useState(false)

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
        // Gọi API để lấy dữ liệu tài khoản
        const fetchAccounts = async () => {
            try {
                const response = await studentService.getAllAccount()
                // Cập nhật giá trị cho state allaccounts với dữ liệu tài khoản nhận được từ API
                setAllAccounts(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        // Gọi hàm fetchAccounts để lấy dữ liệu tài khoản khi component được render
        fetchAccounts()
    }, [])

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

    const getAllAccount = () => {
        studentService
            .getAllAccount()
            .then((response) => {
                setAllStudents(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function hideStudent(id) {
        setStudentId(id)
        setShowConfirmationModal(true)
    }

    const confirmHideStudent = () => {
        if (studentId.id) {
            studentService
                .hideStudentInfo(studentId.id)
                .then(() => {
                    toast.success('Cập nhật thành công')
                    setStudent(student.filter((item) => item.id !== studentId.id))
                    getAllStudent()
                })
                .finally(() => {
                    setShowConfirmationModal(false)
                    setStudentId(null)
                })
        }
    }

    function cancelHideStudent() {
        setShowConfirmationModal(false) // Ẩn modal xác nhận
    }

    const handleUpdateStudent = (updatedStudent) => {
        const updatedStudentIndex = student.findIndex((stu) => stu.id === updatedStudent.id)
        const updatedStudentList = [...student]
        updatedStudentList[updatedStudentIndex] = updatedStudent
        setStudent(updatedStudentList)
    }

    const handleAddStudent = (newStudent) => {
        setStudent([...student, newStudent])
        getAllStudent()
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

    const handleReturnButtonClick = () => {
        navigator(-1)
    }

    return (
        <div className="StudentSection">
            <h2>Quản lý thông tin sinh viên</h2>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
                <button className="add-button" onClick={() => addStudentUpdateModal(student)}>
                    + Thêm sinh viên
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
                onUpdate={handleUpdateStudent}
            />
            <StudentAddModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                student={selectedStudent}
                students={allstudents}
                accounts={allaccounts}
                onUpdate={handleAddStudent}
            />
        </div>
    )
}

export default StudentSection

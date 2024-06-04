import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/toast'
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
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchCriteria, setSearchCriteria] = useState('studentCode')
    const [selectedMajor, setSelectedMajor] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7

    const navigator = useNavigate()

    const toast = useToast()

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
        const fetchAccounts = async () => {
            try {
                const response = await studentService.getAllAccount()
                setAllAccounts(response.data)
            } catch (error) {
                console.error(error)
            }
        }
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
        setShowConfirmationModal(false)
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
        console.log('student: ', allstudents)
        console.log('selectedStudent: ', selectedStudent)
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

    const filteredStudents = student.filter((stu) => {
        const searchValue = searchKeyword.toLowerCase()
        const matchesSearchCriteria = () => {
            switch (searchCriteria) {
                case 'studentCode':
                    return stu.studentCode.toLowerCase().includes(searchValue)
                case 'fullName':
                    return stu.fullName.toLowerCase().includes(searchValue)
                case 'phone':
                    return stu.phone.includes(searchKeyword)
                case 'idcard':
                    return stu.idcard.includes(searchKeyword)
                default:
                    return false
            }
        }
        const matchesMajor = selectedMajor === '' || stu.major.name === selectedMajor
        return matchesSearchCriteria() && matchesMajor
    })

    const indexOfLastStudent = currentPage * itemsPerPage
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const renderPagination = () => {
        let items = []
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            )
        }
        return (
            <div className="pagination-container">
                <Pagination>{items}</Pagination>
            </div>
        )
    }

    return (
        <div className="StudentSection">
            <h2>Quản lý thông tin sinh viên</h2>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
                <div className="search-major-container">
                    <p>Lọc:</p>
                    <select
                        className="major-select styled-select major-select"
                        value={selectedMajor}
                        onChange={(e) => setSelectedMajor(e.target.value)}
                    >
                        <option value="">Tất cả các ngành</option>
                        {allstudents
                            .map((stu) => stu.major.name)
                            .filter((value, index, self) => self.indexOf(value) === index)
                            .map((major) => (
                                <option key={major} value={major}>
                                    {major}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="search-container">
                    <select
                        className="search-select styled-select"
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value)}
                    >
                        <option value="studentCode">Mã sinh viên</option>
                        <option value="fullName">Tên sinh viên</option>
                        <option value="phone">Số điện thoại</option>
                        <option value="idcard">Căn cước công dân</option>
                    </select>
                    <input
                        type="text"
                        className="search-input styled-input"
                        placeholder="Tìm kiếm sinh viên..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
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
                        <th>Lớp</th>
                        <th>Ngành</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student) => (
                        <tr key={student.studentCode}>
                            <td>{student.studentCode}</td>
                            <td>{student.fullName}</td>
                            <td>{student.gender}</td>
                            <td>{student.birthday}</td>
                            <td>{student.idcard}</td>
                            <td>{student.phone}</td>
                            <td>{student.studentClass.code}</td>
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
                                    onClick={() => hideStudent(student)}
                                >
                                    Xoá
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {renderPagination()}
            <Modal show={showConfirmationModal} onHide={cancelHideStudent} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xoá sinh viên khỏi danh sách không?</Modal.Body>
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

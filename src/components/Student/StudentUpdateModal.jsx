import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { studentService } from '../../services/StudentService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './StudentUpdateModal.scss'

const StudentUpdateModal = ({ show, onHide, student, onUpdate }) => {
    //const [editedStudent, setEditedStudent] = useState({ majorID: student.major?.name || '' });
    const [editedStudent, setEditedStudent] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [majors, setMajors] = useState([])

    useEffect(() => {
        setEditedStudent(student)
    }, [student])

    useEffect(() => {
        studentService
            .getAllMajors()
            .then((majorsResponse) => {
                setMajors(majorsResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        const newValue = value || ''
        setEditedStudent((prevState) => ({ ...prevState, [name]: newValue }))
    }

    const handleSubmit = async () => {
        showConfirmationModal() // Hiển thị modal xác nhận
    }

    const showConfirmationModal = () => {
        setShowConfirmation(true)
    }

    const hideConfirmationModal = () => {
        setShowConfirmation(false)
    }

    const handleConfirmUpdate = async () => {
        let majorIDToUpdate
        if (editedStudent.majorID) {
            majorIDToUpdate = editedStudent.majorID
        } else {
            majorIDToUpdate = student.major?.id
        }
        await studentService
            .updateStudentInfo(student.id, {
                studentCode: editedStudent.studentCode,
                fullName: editedStudent.fullName,
                gender: editedStudent.gender,
                birthday: editedStudent.birthday,
                phone: editedStudent.phone,
                major: { id: majorIDToUpdate },
            })

            .then(() => {
                toast.success('Cập nhật thành công')
                window.location.reload()
                onUpdate(editedStudent)
                onHide() // Ẩn modal chỉnh sửa
                hideConfirmationModal() // Ẩn modal xác nhận
                navigator('/student/infor')
            })
            .catch((error) => {
                onHide() // Ẩn modal chỉnh sửa
                hideConfirmationModal() // Ẩn modal xác nhận
                navigator('/student/infor')
                const errorHandler = new HttpRequestErrorHandler(error)
                errorHandler.handleAxiosError()
                toast.error(errorHandler.message)
            })
    }

    const handleCancelUpdate = () => {
        hideConfirmationModal()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin sinh viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="studentCode">
                        <Form.Label>Mã sinh viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="studentCode"
                            value={editedStudent.studentCode}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="fullName">
                        <Form.Label>Tên sinh viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={editedStudent.fullName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Label>Giới tính</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Nam"
                                name="gender"
                                value="Nam"
                                id="gender-group"
                                checked={editedStudent.gender === 'Nam'}
                                onChange={handleInputChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Nữ"
                                name="gender"
                                value="Nữ"
                                id="gender-group1"
                                checked={editedStudent.gender === 'Nữ'}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="birthday">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="text"
                            name="birthday"
                            value={editedStudent.birthday}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="idcard">
                        <Form.Label>Căn cước công dân</Form.Label>
                        <Form.Control
                            type="text"
                            name="idcard"
                            value={editedStudent.idcard}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editedStudent.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className="form-group mb-2">
                        <label className="form-label">Ngành:</label>
                        <div className="select-container">
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="majorID"
                                value={editedStudent.majorID}
                                onChange={handleInputChange}
                            >
                                <option value={student.major?.id}>
                                    {editedStudent.major?.name}
                                </option>
                                {majors.map(
                                    (major) =>
                                        major.name !== editedStudent.major?.name && (
                                            <option key={major.id} value={major.id}>
                                                {major.name}
                                            </option>
                                        )
                                )}
                            </select>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="close-button" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
            <Modal show={showConfirmation} onHide={hideConfirmationModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận cập nhật</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn cập nhật thông tin sinh viên này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelUpdate}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    )
}

export default StudentUpdateModal

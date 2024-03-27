import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './StudentUpdateModal.scss'

const StudentUpdateModal = ({ show, onHide, student, onUpdate }) => {
    const [editedStudent, setEditedStudent] = useState(student)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false) // Thêm trạng thái cho modal chỉnh sửa

    useEffect(() => {
        setEditedStudent(student)
    }, [student])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setEditedStudent((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = () => {
        showConfirmationModal()
        onUpdate(editedStudent)
        onHide()
    }

    const showConfirmationModal = () => {
        setShowConfirmation(true)
    }

    const hideConfirmationModal = () => {
        setShowConfirmation(false)
    }

    const handleConfirmUpdate = () => {
        onUpdate(editedStudent)
        onHide()
        hideConfirmationModal()
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
                    <Form.Group controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editedStudent.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="major">
                        <Form.Label>Mã ngành</Form.Label>
                        <Form.Control
                            type="text"
                            name="major"
                            value={editedStudent.major}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
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

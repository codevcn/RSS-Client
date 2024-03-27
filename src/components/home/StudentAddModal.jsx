import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './StudentAddModal.scss'

const StudentAddModal = ({ show, onHide, onAdd }) => {
    const [newStudent, setNewStudent] = useState({
        studentCode: '',
        fullName: '',
        gender: '',
        birthday: '',
        phone: '',
        major: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewStudent((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = () => {
        onAdd(newStudent)
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm sinh viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="studentCode">
                        <Form.Label>Mã sinh viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="studentCode"
                            value={newStudent.studentCode}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="fullName">
                        <Form.Label>Tên sinh viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={newStudent.fullName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Control
                            type="text"
                            name="gender"
                            value={newStudent.gender}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="birthday">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control
                            type="text"
                            name="birthday"
                            value={newStudent.birthday}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={newStudent.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="major">
                        <Form.Label>Mã ngành</Form.Label>
                        <Form.Control
                            type="text"
                            name="major"
                            value={newStudent.major}
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
                    Thêm sinh viên
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default StudentAddModal

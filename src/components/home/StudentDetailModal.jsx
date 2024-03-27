import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import './StudentDetailModal.scss'

const StudentDetailModal = ({ show, onHide, student }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết sinh viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="studentCode">
                        <Form.Label>Mã sinh viên</Form.Label>
                        <Form.Control type="text" value={student.studentCode} readOnly />
                    </Form.Group>
                    <Form.Group controlId="fullName">
                        <Form.Label>Tên sinh viên</Form.Label>
                        <Form.Control type="text" value={student.fullName} readOnly />
                    </Form.Group>
                    <Form.Group controlId="gender">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Control type="text" value={student.gender} readOnly />
                    </Form.Group>
                    <Form.Group controlId="birthday">
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="text" value={student.birthday} readOnly />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" value={student.phone} readOnly />
                    </Form.Group>
                    <Form.Group controlId="major">
                        <Form.Label>Mã ngành</Form.Label>
                        <Form.Control type="text" value={student.major} readOnly />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="close-button" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default StudentDetailModal

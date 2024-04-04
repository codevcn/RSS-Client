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
                    <div className="form-group" id="studentCode">
                        <label>Mã sinh viên</label>
                        <div className="form-control">{student.studentCode}</div>
                    </div>
                    <div className="form-group" id="fullName">
                        <label>Tên sinh viên</label>
                        <div className="form-control">{student.fullName}</div>
                    </div>
                    <div className="form-group" id="gender">
                        <label>Giới tính</label>
                        <div className="form-control">{student.gender}</div>
                    </div>
                    <div className="form-group" id="birthday">
                        <label>Ngày sinh</label>
                        <div className="form-control">{student.birthday}</div>
                    </div>
                    <div className="form-group" id="idcard">
                        <label>Căn cước công dân</label>
                        <div className="form-control">{student.idcard}</div>
                    </div>
                    <div className="form-group" id="phone">
                        <label>Số điện thoại</label>
                        <div className="form-control">{student.phone}</div>
                    </div>
                    <div className="form-group" id="major">
                        <label>Mã ngành</label>
                        <div className="form-control">{student.major?.name || ''}</div>
                    </div>
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

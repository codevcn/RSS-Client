import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import './StudentDetailModal.scss'

const StudentDetailModal = ({ show, onHide, student }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết sinh viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <div className="form-group" id="studentCode">
                                <label>Mã sinh viên</label>
                                <div className="form-control">{student.studentCode}</div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group" id="fullName">
                                <label>Tên sinh viên</label>
                                <div className="form-control">{student.fullName}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group" id="gender">
                                <label>Giới tính</label>
                                <div className="form-control">{student.gender}</div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group" id="birthday">
                                <label>Ngày sinh</label>
                                <div className="form-control">{student.birthday}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group" id="idcard">
                                <label>Căn cước công dân</label>
                                <div className="form-control">{student.idcard}</div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group" id="phone">
                                <label>Số điện thoại</label>
                                <div className="form-control">{student.phone}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group" id="studentClass">
                                <label>Lớp</label>
                                <div className="form-control">
                                    {student.studentClass?.code || ''}
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group" id="major">
                                <label>Ngành</label>
                                <div className="form-control">{student.major?.name || ''}</div>
                            </div>
                        </Col>
                    </Row>
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

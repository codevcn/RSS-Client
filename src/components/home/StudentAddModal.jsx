import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { studentService } from '../../services/StudentService'
import './StudentAddModal.scss'

const StudentAddModal = ({ show, onHide, onAdd }) => {
    const [majors, setMajors] = useState([])

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

    const [newStudent, setNewStudent] = useState([])

    const [accountInfo, setAccountInfo] = useState({
        username: '',
        password: '',
    })

    const handleStudentInputChange = (event) => {
        const { name, value } = event.target
        setNewStudent((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleAccountInputChange = (event) => {
        const { name, value } = event.target
        setAccountInfo((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = () => {
        event.preventDefault()
        const newStudentWithAccountInfo = { ...newStudent, ...accountInfo }
        console.log('Dữ liệu mới của sinh viên:', newStudentWithAccountInfo)
        onAdd(newStudentWithAccountInfo)
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm sinh viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <Form>
                            <Form.Group controlId="studentCode">
                                <Form.Label>Mã sinh viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="studentCode"
                                    value={newStudent.studentCode}
                                    onChange={handleStudentInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="fullName">
                                <Form.Label>Tên sinh viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={newStudent.fullName}
                                    onChange={handleStudentInputChange}
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
                                        onChange={handleStudentInputChange}
                                        defaultChecked
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Nữ"
                                        name="gender"
                                        value="Nữ"
                                        id="gender-group1"
                                        onChange={handleStudentInputChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="birthday">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="birthday"
                                    value={newStudent.birthday}
                                    onChange={handleStudentInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={newStudent.phone}
                                    onChange={handleStudentInputChange}
                                />
                            </Form.Group>
                            {/* <Form.Group controlId="major">
                                <Form.Label>Mã ngành</Form.Label>
                                <Form.Control as="select" name="major" onChange={handleStudentInputChange}>
                                    {majors.map((major, index) => (
                                        <option key={index} value={major.majorCode}> {}
                                            {major.name} {}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group> */}
                            <div className="form-group mb-2">
                                <label className="form-label">Ngành:</label>
                                <div className="select-container">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="majorID"
                                        // value={editedStudent.majorID}
                                        // onChange={handleInputChange}
                                    >
                                        {majors.map((major) => (
                                            <option key={major.id} value={major.id}>
                                                {major.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="col-md-6">
                        <Form>
                            <Form.Group controlId="username">
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={accountInfo.username}
                                    onChange={handleAccountInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={accountInfo.password}
                                    onChange={handleAccountInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="close-button" onClick={onHide} type="button">
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit} type="button">
                    Thêm sinh viên
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default StudentAddModal

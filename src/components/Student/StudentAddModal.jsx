import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { studentService } from '../../services/StudentService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './StudentAddModal.scss'

const StudentAddModal = ({ show, onHide }) => {
    const [majors, setMajors] = useState([])

    const [newStudent, setNewStudent] = useState({
        studentCode: '',
        fullName: '',
        gender: 'Nam',
        birthday: '',
        idcard: '',
        phone: '',
        major: '',
    })

    const [accountInfo, setAccountInfo] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        studentService
            .getAllMajors()
            .then((majorsResponse) => {
                setMajors(majorsResponse.data)
                if (majorsResponse.data.length > 0) {
                    setNewStudent((prevState) => ({ ...prevState, major: majorsResponse.data[0] }))
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleMajorChange = (event) => {
        const { value } = event.target
        const selectedMajor = majors.find((major) => major.id === parseInt(value))
        setNewStudent((prevState) => ({ ...prevState, major: selectedMajor }))
        console.log('majors:' + majors, 'selectedMajor:' + selectedMajor)
    }

    const handleStudentInputChange = (event) => {
        const { name, value } = event.target
        setNewStudent((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleAccountInputChange = (event) => {
        const { name, value } = event.target
        setAccountInfo((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async () => {
        event.preventDefault()
        const newStudentWithAccountInfo = { ...newStudent, ...accountInfo }
        console.log('Dữ liệu mới của sinh viên:', newStudentWithAccountInfo)
        //onAdd(newStudentWithAccountInfo)
        try {
            await studentService.addStudent(newStudentWithAccountInfo)
            toast.success('Cập nhật thành công')
            window.location.reload()
            onHide()
        } catch (error) {
            onHide() // Ẩn modal chỉnh sửa
            const errorHandler = new HttpRequestErrorHandler(error)
            errorHandler.handleAxiosError()
            toast.error(errorHandler.message)
        }
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
                            <Form.Group controlId="idcard">
                                <Form.Label>Căn cước công dân</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="idcard"
                                    value={newStudent.idcard}
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
                            <div className="form-group mb-2">
                                <label className="form-label">Ngành:</label>
                                <div className="select-container">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="majorID"
                                        value={newStudent.majorID}
                                        onChange={handleMajorChange}
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

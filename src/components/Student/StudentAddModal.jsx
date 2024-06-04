import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useToast } from '../../hooks/toast'
import { studentService } from '../../services/StudentService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './StudentAddModal.scss'

const StudentAddModal = ({ show, onHide, onUpdate, students, accounts }) => {
    const [majors, setMajors] = useState([])
    const [studentClasses, setstudentClasses] = useState([])
    const [errors, setErrors] = useState({})
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const [newStudent, setNewStudent] = useState({
        studentCode: '',
        fullName: '',
        gender: 'Nam',
        birthday: '',
        idcard: '',
        phone: '',
        major: '',
    })
    const toast = useToast()
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

    useEffect(() => {
        studentService
            .getAllStudentClasses()
            .then((studentClassesResponse) => {
                setstudentClasses(studentClassesResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleMajorChange = (event) => {
        const { value } = event.target
        const selectedMajor = majors.find((major) => major.id === parseInt(value))
        console.log('selectedMajor: ', selectedMajor)
        setNewStudent((prevState) => ({ ...prevState, major: selectedMajor }))
    }

    const handleInputChangeSudentClass = (event) => {
        const { name, value } = event.target
        const newValue = value || ''
        if (name === 'studentClassID') {
            const selectedStudentClass = studentClasses.find(
                (studentClass) => studentClass.id === parseInt(value)
            )
            setNewStudent((prevState) => ({
                ...prevState,
                studentClassID: value,
                studentClass: selectedStudentClass,
            }))
        } else {
            setNewStudent((prevState) => ({ ...prevState, [name]: newValue }))
        }
    }

    const handleStudentInputChange = (event) => {
        const { name, value } = event.target
        setNewStudent((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleAccountInputChange = (event) => {
        const { name, value } = event.target
        setAccountInfo((prevState) => ({ ...prevState, [name]: value }))
    }

    const hideConfirmationModal = () => {
        setShowConfirmation(false)
    }

    const handleCancelAdd = () => {
        hideConfirmationModal()
    }

    const handleConfirmAdd = async () => {
        event.preventDefault()
        //const newStudentWithAccountInfo = { ...newStudent, ...accountInfo }
        const newStudentWithAccountInfo = { ...newStudent }
        console.log('Dữ liệu mới của sinh viên:', newStudentWithAccountInfo)
        //onAdd(newStudentWithAccountInfo)
        try {
            await studentService.addStudent(newStudentWithAccountInfo)
            toast.success('Cập nhật thành công')
            //window.location.reload()
            onUpdate(newStudentWithAccountInfo)
            onHide()
        } catch (error) {
            onHide()
            const errorHandler = new HttpRequestErrorHandler(error)
            errorHandler.handleAxiosError()
            toast.error(errorHandler.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}

        if (students.some((stu) => stu.studentCode === newStudent.studentCode)) {
            validationErrors.studentCode = 'Mã sinh viên đã tồn tại !'
        }
        if (!newStudent.studentCode.trim()) {
            validationErrors.studentCode = 'Không để trống Mã sinh viên!'
        } else if (newStudent.studentCode.length !== 10) {
            validationErrors.studentCode = 'Mã sinh viên phải chứa 10 ký tự!'
        }
        if (!newStudent.fullName.trim()) {
            validationErrors.fullName = 'Không để trống Tên sinh viên!'
        }

        if (!newStudent.birthday.trim()) {
            validationErrors.birthday = 'Không để trống ngày sinh'
        } else {
            const birthday = new Date(newStudent.birthday)
            const eighteenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            if (birthday > eighteenYearsAgo) {
                validationErrors.birthday = 'Phải trên 18 tuổi'
            }
        }

        if (students.some((stu) => stu.idcard === newStudent.idcard)) {
            validationErrors.idcard = 'CCCD đã tồn tại !'
        }
        if (!newStudent.idcard.trim()) {
            validationErrors.idcard = 'Không để trống CCCD!'
        } else if (newStudent.idcard.length !== 12) {
            validationErrors.idcard = 'Số CCCD phải chứa 12 số !'
        } else if (!/^[0-9]+$/.test(newStudent.idcard)) {
            validationErrors.idcard = 'Số CCCD phải là chữ số!'
        }

        if (students.some((stu) => stu.phone === newStudent.phone)) {
            validationErrors.phone = 'Số điện thoại đã tồn tại !'
        }
        if (!newStudent.phone.trim()) {
            validationErrors.phone = 'Không để trống Số điện thoại!'
        } else if (newStudent.phone.length !== 10) {
            validationErrors.phone = 'Số điện thoại phải chứa 10 số !'
        } else if (!/^[0-9]+$/.test(newStudent.phone)) {
            validationErrors.idcard = 'Số điện thoại phải là chữ số!'
        }

        // if (accounts.some((aco) => aco.username === accountInfo.username)) {
        //     validationErrors.username = 'Tài khoản đã tồn tại !'
        // }

        // if (!accountInfo.username.trim()) {
        //     validationErrors.username = 'Không để trống Tài khoản !'
        // }

        // if (!accountInfo.password.trim()) {
        //     validationErrors.password = 'Không để trống Mật khẩu !'
        // }

        setErrors(validationErrors)

        console.log(Object.keys(validationErrors).length)

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirmation(true)
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra các trường nhập liệu.')
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered id="myCustomModal">
            <Modal.Header closeButton>
                <Modal.Title>Thêm sinh viên mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row editor">
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
                                {errors.studentCode && (
                                    <span className="warning-text">{errors.studentCode}</span>
                                )}
                            </Form.Group>
                            <Form.Group controlId="fullName">
                                <Form.Label>Tên sinh viên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={newStudent.fullName}
                                    onChange={handleStudentInputChange}
                                />
                                {errors.fullName && (
                                    <span className="warning-text">{errors.fullName}</span>
                                )}
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
                                    type="date"
                                    name="birthday"
                                    value={newStudent.birthday}
                                    onChange={handleStudentInputChange}
                                />
                                {errors.birthday && (
                                    <span className="warning-text">{errors.birthday}</span>
                                )}
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-md-6">
                        <Form.Group controlId="idcard">
                            <Form.Label>Căn cước công dân</Form.Label>
                            <Form.Control
                                type="text"
                                name="idcard"
                                value={newStudent.idcard}
                                onChange={handleStudentInputChange}
                            />
                            {errors.idcard && <span className="warning-text">{errors.idcard}</span>}
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={newStudent.phone}
                                onChange={handleStudentInputChange}
                            />
                            {errors.phone && <span className="warning-text">{errors.phone}</span>}
                        </Form.Group>
                        <div className="form-group mb-2">
                            <label className="form-label">Lớp:</label>
                            <div className="select-container">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    name="studentClassID"
                                    value={newStudent.studentClassID}
                                    onChange={handleInputChangeSudentClass}
                                >
                                    {studentClasses.map((studentClass) => (
                                        <option key={studentClass.id} value={studentClass.id}>
                                            {studentClass.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
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
                        {/* <Form>
                            <Form.Group controlId="username">
                                <Form.Label>Tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={accountInfo.username}
                                    onChange={handleAccountInputChange}
                                />
                                {errors.username && (
                                    <span className="warning-text">{errors.username}</span>
                                )}
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Mật khẩu</Form.Label>
                                <div className="password-input">
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={accountInfo.password}
                                        onChange={handleAccountInputChange}
                                    />
                                    <i
                                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password-icon`}
                                        onClick={toggleShowPassword}
                                    ></i>
                                </div>
                                {errors.password && (
                                    <span className="warning-text">{errors.password}</span>
                                )}
                            </Form.Group>
                        </Form> */}
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
            <Modal show={showConfirmation} onHide={hideConfirmationModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn thêm thông tin sinh viên này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelAdd}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAdd}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    )
}

export default StudentAddModal

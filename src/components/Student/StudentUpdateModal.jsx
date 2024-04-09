import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useToast } from '../../hooks/toast'
import { studentService } from '../../services/StudentService'
import './StudentUpdateModal.scss'

const StudentUpdateModal = ({ show, onHide, student, onUpdate, students }) => {
    const [editedStudent, setEditedStudent] = useState({})
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [majors, setMajors] = useState([])
    const [errors, setErrors] = useState({})
    const toast = useToast()
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if (
            editedStudent.studentCode !== student.studentCode &&
            students.some((stu) => stu.studentCode === editedStudent.studentCode)
        ) {
            validationErrors.studentCode = 'Mã sinh viên đã tồn tại !'
        }
        if (editedStudent.studentCode.length !== 10) {
            validationErrors.studentCode = 'Mã sinh viên phải chứa 10 ký tự !'
        }
        if (!editedStudent.studentCode.trim()) {
            validationErrors.studentCode = 'Không để trống Mã sinh viên!'
        }
        if (!editedStudent.fullName.trim()) {
            validationErrors.fullName = 'Không để trống Tên sinh viên!'
        }
        if (
            editedStudent.idcard !== student.idcard &&
            students.some((stu) => stu.idcard === editedStudent.idcard)
        ) {
            validationErrors.idcard = 'CCCD đã tồn tại !'
        }
        if (!editedStudent.idcard.trim()) {
            validationErrors.idcard = 'Không để trống CCCD!'
        }
        if (editedStudent.idcard.length !== 12) {
            validationErrors.idcard = 'Số CCCD phải chứa 12 số !'
        }
        if (
            editedStudent.phone !== student.phone &&
            students.some((stu) => stu.phone === editedStudent.phone)
        ) {
            validationErrors.phone = 'Số điện thoại đã tồn tại !'
        }
        if (!editedStudent.phone.trim()) {
            validationErrors.phone = 'Không để trống Số điện thoại!'
        }
        if (editedStudent.phone.length !== 10) {
            validationErrors.phone = 'Số điện thoại phải chứa 10 số !'
        }
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirmation(true)
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra các trường nhập liệu.')
        }
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
                idcard: editedStudent.idcard,
                phone: editedStudent.phone,
                major: { id: majorIDToUpdate },
            })
            .then(() => {
                toast.success('Cập nhật thành công')
                window.location.reload()
                onUpdate(editedStudent)
                onHide()
                hideConfirmationModal()
            })
            .catch((error) => {
                onHide()
                hideConfirmationModal()
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
                        {errors.studentCode && (
                            <span className="text-danger">{errors.studentCode}</span>
                        )}
                    </Form.Group>
                    <Form.Group controlId="fullName">
                        <Form.Label>Tên sinh viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={editedStudent.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
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
                            type="date"
                            name="birthday"
                            value={editedStudent.birthday}
                            onChange={handleInputChange}
                        />
                        {errors.birthday && <span className="text-danger">{errors.birthday}</span>}
                    </Form.Group>
                    <Form.Group controlId="idcard">
                        <Form.Label>Căn cước công dân</Form.Label>
                        <Form.Control
                            type="text"
                            name="idcard"
                            value={editedStudent.idcard}
                            onChange={handleInputChange}
                        />
                        {errors.idcard && <span className="text-danger">{errors.idcard}</span>}
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editedStudent.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
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

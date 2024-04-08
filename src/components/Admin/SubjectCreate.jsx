import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './SubjectCreate.scss'

const SubjectCreate = ({subjects, show, onHide}) => {
    const [subject, setSubject] = useState([])
    const [majors, setMajors] = useState([])
    const [errors, setErrors] = useState({})
    const [showConfirm, setShowConfirm] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }))
    }
    useEffect(() => {
        adminService
            .getAllMajors()
            .then((majorsResponse) => {
                setMajors(majorsResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        
        if (
            subjects.some(
                (sub) =>
                sub.subjectCode === subject.subjectCode
            )
        ) {
            validationErrors.subjectCode = 'Mã Môn Học đã tồn tại !'
        }
        if (!subject.name) {
            validationErrors.name = 'Không để trống Tên Môn Học!'
        }
        if (!subject.subjectCode) {
            validationErrors.subjectCode = 'Không để trống Mã Môn Học!'
        }
        if (!subject.creditCount) {
            validationErrors.creditCount = 'Không để trống Số tín chỉ!'
        }
        if (!/^\d+$/.test(subject.creditCount)) {
            validationErrors.creditCount = 'Số tín chỉ phải là chữ số!'
        }
        if (!subject.majorID) {
            validationErrors.majorID = 'Vui lòng chọn chuyên ngành!'
        }
        if (subject.creditCount < 0 || subject.creditCount > 4) {
            toast.error('Số Tín chỉ trong khoảng từ 1 đến 4!')
            return
        }
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirm(true)
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra các trường nhập liệu.')
        }
    }

    const handleConfirmUpdate = () => {
        console.log("???",{
            name: subject.name,
            subjectCode: subject.subjectCode,
            creditCount: subject.creditCount,
            major: { id: subject.majorID },
        })
        adminService
            .createSubjectInfo({
                name: subject.name,
                subjectCode: subject.subjectCode,
                creditCount: subject.creditCount,
                major: { id: subject.majorID },
            })
            .then(() => {
                toast.success('Cập nhật thành công')
                onHide()
                window.location.reload(true)
            })
            .catch((error) => {
                const errorHandler = new HttpRequestErrorHandler(error)
                errorHandler.handleAxiosError()
                toast.error(errorHandler.message)
            })
        setShowConfirm(false)
    }
    
    const handleCloseModal = () => {
        setShowConfirm(false)
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Môn Học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formname">
                        <Form.Label>Tên Môn Học:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={subject.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formsubjectCode">
                        <Form.Label>Mã Môn Học:</Form.Label>
                        <Form.Control
                            type="text"
                            name="subjectCode"
                            value={subject.subjectCode}
                            onChange={handleInputChange}
                        />
                        {errors.subjectCode && (
                            <span className="text-danger">{errors.subjectCode}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formcreditCount">
                        <Form.Label>Số tín chỉ:</Form.Label>
                        <Form.Control
                            type="text"
                            name="creditCount"
                            value={subject.creditCount}
                            onChange={handleInputChange}
                        />
                        {errors.creditCount && (
                            <span className="text-danger">{errors.creditCount}</span>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formmajor">
                        <Form.Label>Ngành:</Form.Label>
                        <Form.Select
                            name="majorID"
                            value={subject.majorID}
                            onChange={handleInputChange}
                        >
                            <option value="">Chọn ngành</option>
                            {majors.map((major) => (
                                <option key={major.id} value={major.id}>
                                    {major.name}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.majorID && <span className="text-danger">{errors.majorID}</span>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
                {showConfirm && (
                    <Modal show={true} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Xác nhận Thêm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn Thêm thông tin này không?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Hủy
                            </Button>
                            <Button variant="primary" onClick={handleConfirmUpdate}>
                                Xác nhận
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default SubjectCreate

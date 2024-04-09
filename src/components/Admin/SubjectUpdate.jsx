import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {useToast} from '../../hooks/toast'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './SubjectUpdate.scss'
const SubjectUpdate = ({ subjects, subject, show, onHide ,editSubject }) => {
    const [subdata, setSubdata] = useState(subject)
    const [majors, setMajors] = useState([])
    const [errors, setErrors] = useState({})
    const [showConfirm, setShowConfirm] = useState(false)
    const toast = useToast()
    useEffect(() => {
        adminService
            .getAllMajors()
            .then((response) => {
                setMajors(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSubdata((prevSubject) => ({
            ...prevSubject,
            [name]: value,
            
        }))
    }
    
    const handleMajorChange = (e) => {
        const { value } = e.target
        const major = majors.find((major) =>{
            if ( major.id === value*1){
                return true
            }
        })
        setSubdata((prevSubdata) => ({
            ...prevSubdata,
            major: {
                id: major.id,
                name : major.name
            },
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if (
            subdata.subjectCode !== subject.subjectCode &&
            subjects.some((sub) => sub.subjectCode === subdata.subjectCode)
        ) {
            validationErrors.subjectCode = 'Mã môn học đã tồn tại !'
        }
        if (!subdata.name.trim()) {
            validationErrors.name = 'Không để trống Tên Môn Học!'
        }
        if (!subdata.subjectCode) {
            validationErrors.subjectCode = 'Không để trống Mã Môn Học!'
        }
        if (!subdata.creditCount) {
            validationErrors.creditCount = 'Không để trống Số tín chỉ!'
        }
        if (!/^\d+$/.test(subdata.creditCount)) {
            validationErrors.creditCount = 'Số tín chỉ phải là chữ số!'
        }
        if (subdata.creditCount < 0 || subdata.creditCount > 4) {
            validationErrors.creditCount = 'Số tín chỉ phải nằm trong khoảng từ 1 đến 4!'
        }
        if (!subdata.major.id) {
            validationErrors.majorID = 'Vui lòng chọn chuyên ngành!'
        }
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirm(true)
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra các trường nhập liệu.')
        }
    }

    const handleConfirmUpdate = () => {
        adminService
            .updateSubjectInfo(subject.id, {
                name: subdata.name,
                subjectCode: subdata.subjectCode,
                creditCount: subdata.creditCount,
                major: { id: subdata.major.id },
            })
            .then(() => {
                toast.success('Cập nhật thành công')
                onHide()
                editSubject ({
                    id : subject.id,
                    name: subdata.name,
                    subjectCode: subdata.subjectCode,
                    creditCount: subdata.creditCount,
                    major: { id: subdata.major.id, name: subdata.major.name },
                })
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
                <Modal.Title>Chỉnh Sửa Môn Học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formname">
                        <Form.Label>Tên Môn Học:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={subdata.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formsubjectCode">
                        <Form.Label>Mã Môn Học:</Form.Label>
                        <Form.Control
                            type="text"
                            name="subjectCode"
                            value={subdata.subjectCode}
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
                            value={subdata.creditCount}
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
                            value={subdata.major?.id}
                            onChange={handleMajorChange}
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
                            <Modal.Title>Xác nhận cập nhật</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn cập nhật thông tin này không?</Modal.Body>
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

export default SubjectUpdate

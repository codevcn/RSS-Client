import { useState } from 'react'
import {
    Button,
    Form,
    FormText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from 'react-bootstrap'
import { useToast } from '../../hooks/toast'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './ChangePass.scss'

const ChangePasswordForm = ({ show, onHide, id }) => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [showConfirm, setShowConfirm] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)
    const toast = useToast()
    const handleChange = (e) => {
        const { name, value } = e.target
        setPasswords({ ...passwords, [name]: value })
    }

    const handleToggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }

    const handleToggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    const handleToggleShowConfirmedPassword = () => {
        setShowConfirmedPassword(!showConfirmedPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = {}

        if (!passwords.currentPassword.trim()) {
            validationErrors.currentPassword = 'Vui lòng nhập mật khẩu cũ'
        }

        if (!passwords.newPassword.trim()) {
            validationErrors.newPassword = 'Vui lòng nhập mật khẩu mới'
        }

        if (!passwords.confirmPassword.trim()) {
            validationErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu mới'
        } else if (passwords.confirmPassword !== passwords.newPassword) {
            validationErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirm(true)
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra các trường nhập liệu.')
        }
    }

    const handleConfirm = () => {
        adminService
            .ChangePass({
                oldPass: passwords.currentPassword,
                newPass: passwords.newPassword,
            })
            .then(() => {
                toast.success('Cập nhật mật khẩu thành công')
                onHide()
            })
            .catch((error) => {
                const errorHandler = new HttpRequestErrorHandler(error)
                errorHandler.handleAxiosError()
                toast.error(errorHandler.message)
                handleCancel()
            })
    }

    const handleCancel = () => {
        setShowConfirm(false)
    }

    return (
        <Modal className="changepass" show={show} onHide={onHide} centered>
            <ModalHeader closeButton>
                <ModalTitle className="title">Thay Đổi Mật Khẩu</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="text" controlId="currentPassword">
                        <Form.Label>Mật khẩu hiện tại</Form.Label>
                        <div className="password-toggle">
                            <Form.Control
                                type={showCurrentPassword ? 'text' : 'password'}
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={handleChange}
                            />
                            <i
                                className={`bi ${showCurrentPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                                onClick={handleToggleShowCurrentPassword}
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />
                        </div>
                        {errors.currentPassword && (
                            <FormText className="text-danger">{errors.currentPassword}</FormText>
                        )}
                    </Form.Group>
                    <Form.Group className="text" controlId="newPassword">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <div className="password-toggle">
                            <Form.Control
                                type={showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={handleChange}
                            />
                            <i
                                className={`bi ${showNewPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                                onClick={handleToggleShowNewPassword}
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />
                        </div>
                        {errors.newPassword && (
                            <FormText className="text-danger">{errors.newPassword}</FormText>
                        )}
                    </Form.Group>
                    <Form.Group className="text" controlId="confirmPassword">
                        <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                        <div className="password-toggle">
                            <Form.Control
                                type={showConfirmedPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={handleChange}
                            />
                            <i
                                className={`bi ${showConfirmedPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                                onClick={handleToggleShowConfirmedPassword}
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <FormText className="text-danger">{errors.confirmPassword}</FormText>
                        )}
                    </Form.Group>
                    <Button className="save" variant="primary" type="submit">
                        Lưu
                    </Button>
                </Form>
            </ModalBody>
            {showConfirm && (
                <Modal className="Confirm-form" show={true} onHide={handleCancel} centered>
                    <ModalHeader closeButton>
                        <ModalTitle>Xác nhận</ModalTitle>
                    </ModalHeader>
                    <ModalBody>Bạn có chắc chắn muốn thay đổi mật khẩu không?</ModalBody>
                    <ModalFooter>
                        <Button className="Cancel" variant="secondary" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button className="Confirm" variant="primary" onClick={handleConfirm}>
                            Xác nhận
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </Modal>
    )
}

export default ChangePasswordForm

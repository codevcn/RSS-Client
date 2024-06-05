import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useToast } from '../../hooks/toast'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './ChangePass.scss'

const ChangePasswordForm = ({ id }) => {
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
                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                })
                setErrors({})
                setShowConfirm(false)
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
        <div className="changepass">
            <div className="changepass-header">
                <h2 className="title">Thay Đổi Mật Khẩu</h2>
            </div>
            <div className="changepass-body">
                <div className="form-group">
                    <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                    <div className="password-toggle">
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            name="currentPassword"
                            id="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <i
                            className={`bi ${showCurrentPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                            onClick={handleToggleShowCurrentPassword}
                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                        />
                    </div>
                    {errors.currentPassword && (
                        <span className="text-danger">{errors.currentPassword}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <div className="password-toggle">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            id="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <i
                            className={`bi ${showNewPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                            onClick={handleToggleShowNewPassword}
                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                        />
                    </div>
                    {errors.newPassword && (
                        <span className="text-danger">{errors.newPassword}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                    <div className="password-toggle">
                        <input
                            type={showConfirmedPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                        <i
                            className={`bi ${showConfirmedPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
                            onClick={handleToggleShowConfirmedPassword}
                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-danger">{errors.confirmPassword}</span>
                    )}
                </div>
            </div>
            <div className="changepass-footer">
                <Button className="save" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
            </div>
            {showConfirm && (
                <Modal className="Confirm-form" show={true} onHide={handleCancel} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn thay đổi mật khẩu không?</Modal.Body>
                    <Modal.Footer>
                        <Button className="Cancel" variant="secondary" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button className="Confirm" variant="primary" onClick={handleConfirm}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default ChangePasswordForm

import { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import './Login.scss'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { forwardRef } from 'react'
import { authService } from '../../services/AuthService'
import { HttpRequestErrorHandler } from '../../utils/HttpRequestErrorHandler'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const StudentUsernameFormGroup = forwardRef((props, ref) => {
    return (
        <Form.Group controlId="student-ID-form-group" className="form-group">
            <InputGroup>
                <InputGroup.Text>
                    <i className="bi bi-person-fill"></i>
                </InputGroup.Text>
                <Form.Control
                    required
                    type="text"
                    placeholder="Nhập tên tài khoản của sinh viên..."
                    ref={ref}
                />
                <Form.Control.Feedback type="invalid">
                    Vui lòng không bỏ trống trường này!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
})

const PasswordFormGroup = forwardRef((props, ref) => {
    return (
        <Form.Group controlId="password-form-group" className="form-group">
            <InputGroup hasValidation>
                <InputGroup.Text>
                    <i className="bi bi-lock-fill"></i>
                </InputGroup.Text>
                <Form.Control
                    required
                    type="password"
                    placeholder="Nhập mật khẩu tài khoản..."
                    ref={ref}
                />
                <Form.Control.Feedback type="invalid">
                    Vui lòng không bỏ trống trường này!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
})

const LoginSection = () => {
    const [validated, setValidated] = useState(false)
    const studentID_ref = useRef(null)
    const password_ref = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (event.currentTarget.checkValidity()) {
            const studentUsername = studentID_ref.current.value
            const password = password_ref.current.value
            try {
                await authService.login({
                    studentUsername,
                    studentPassword: password,
                })
                toast.success('Đăng nhập thành công')
                navigate('/student-info')
            } catch (error) {
                const errorHanlder = new HttpRequestErrorHandler(error)
                errorHanlder.handleAxiosError()
                toast.error(errorHanlder.message)
            }
        }

        setValidated(true)
    }

    return (
        <div className="LoginSection">
            <h2 className="title-page">Đăng nhập</h2>

            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="login-form"
            >
                <StudentUsernameFormGroup ref={studentID_ref} />

                <PasswordFormGroup ref={password_ref} />

                <Button type="submit" className="submit-btn">
                    <span>Đăng nhập</span>
                    <i className="bi bi-box-arrow-in-right"></i>
                </Button>
            </Form>
        </div>
    )
}

export default LoginSection

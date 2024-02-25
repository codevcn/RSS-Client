import { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import './Home.scss'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { forwardRef } from 'react'
import { authService } from '../services/AuthService'
import { httpRequestErrorHandler } from '../utils/AxiosErrorHandler'

const StudentIDFormGroup = forwardRef((props, ref) => {
    return (
        <Form.Group controlId="student-ID-form-group" className="form-group">
            <InputGroup hasValidation>
                <InputGroup.Text>
                    <i className="bi bi-person-fill"></i>
                </InputGroup.Text>
                <Form.Control
                    required
                    type="text"
                    placeholder="Nhập mã số sinh viên..."
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
    const [showPassword, setShowPassword] = useState(false)

    const hideShowPassword = () => {
        setShowPassword((show) => !show)
    }

    return (
        <Form.Group controlId="password-form-group" className="form-group">
            <InputGroup hasValidation>
                <InputGroup.Text>
                    <i className="bi bi-lock-fill"></i>
                </InputGroup.Text>
                <Form.Control
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu..."
                    ref={ref}
                />
                <Button
                    className="password-action-btn"
                    onClick={hideShowPassword}
                >
                    {showPassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-eye-slash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-eye"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                    )}
                </Button>
                <Form.Control.Feedback type="invalid">
                    Vui lòng không bỏ trống trường này!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
})

const HomePage = () => {
    const [validated, setValidated] = useState(false)
    const studentID_ref = useRef(null)
    const password_ref = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (event.currentTarget.checkValidity()) {
            const studentID = studentID_ref.current.value
            const password = password_ref.current.value
            try {
                await authService.login({
                    studentID,
                    studentPassword: password,
                })
            } catch (error) {
                httpRequestErrorHandler.handleAxiosError(error)
            }
        }

        setValidated(true)
    }

    return (
        <div className="HomePage">
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="login-form"
            >
                <StudentIDFormGroup ref={studentID_ref} />

                <PasswordFormGroup ref={password_ref} />

                <Button type="submit" className="submit-btn">
                    <span>Đăng nhập</span>
                    <i className="bi bi-box-arrow-in-right"></i>
                </Button>
            </Form>
        </div>
    )
}

export default HomePage

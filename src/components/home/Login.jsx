import { forwardRef, useRef, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import toast from 'react-hot-toast'
import { authService } from '../../services/authService'
import { ROLE_ADMIN, ROLE_STUDENT } from '../../utils/constants/roleConstants'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './Login.scss'

const StudentUsernameFormGroup = forwardRef(({ message, onLogin }, ref) => {
    const catchEnter = (e) => {
        if (e.key === 'Enter') {
            onLogin()
        }
    }

    return (
        <div className="form-group">
            <div className="input-wrapper">
                <div className="icon-wrapper">
                    <i className="bi bi-person-fill"></i>
                </div>
                <input
                    onKeyDown={catchEnter}
                    type="text"
                    placeholder="Nhập tên tài khoản của sinh viên..."
                    ref={ref}
                />
            </div>
            {message && (
                <div className="message">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span>{message}</span>
                </div>
            )}
        </div>
    )
})

const PasswordFormGroup = forwardRef(({ message, onLogin }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const hideShowPassword = () => {
        setShowPassword((pre) => !pre)
    }

    const catchEnter = (e) => {
        if (e.key === 'Enter') {
            onLogin()
        }
    }

    return (
        <div className="form-group">
            <div className="input-wrapper">
                <div className="icon-wrapper">
                    <i className="bi bi-lock-fill"></i>
                </div>
                <input
                    onKeyDown={catchEnter}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu tài khoản..."
                    ref={ref}
                />
                <div className="hide-show-passowrd-btn" onClick={hideShowPassword}>
                    <span>
                        {showPassword ? (
                            <i className="bi bi-eye-fill"></i>
                        ) : (
                            <i className="bi bi-eye-slash-fill"></i>
                        )}
                    </span>
                </div>
            </div>
            {message && (
                <div className="message">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span>{message}</span>
                </div>
            )}
        </div>
    )
})

const LoginSection = ({ role }) => {
    const [loading, setLoading] = useState(false)
    const username_ref = useRef(null)
    const password_ref = useRef(null)
    const form_ref = useRef(null)
    const [validation, setValidation] = useState({ username: null, password: null })

    const checkFormIsValid = ({ username, password }) => {
        if (!username) {
            setValidation((pre) => ({ ...pre, username: 'Vui lòng không bỏ trống trường này!' }))
            return false
        }
        if (!password) {
            setValidation((pre) => ({ ...pre, password: 'Vui lòng không bỏ trống trường này!' }))
            return false
        }
        return true
    }

    const login = async () => {
        const username = username_ref.current.value
        const password = password_ref.current.value

        if (checkFormIsValid({ username, password })) {
            setLoading(true)
            try {
                if (role === ROLE_ADMIN) {
                    await authService.loginAdmin({
                        username,
                        password,
                    })
                    window.location.replace('/admin')
                } else if (role === ROLE_STUDENT) {
                    await authService.loginStudent({
                        username,
                        password,
                    })
                    window.location.replace('/student/infor')
                }
            } catch (error) {
                const errorHanlder = new HttpRequestErrorHandler(error)
                errorHanlder.handleAxiosError()
                toast.error(errorHanlder.message)
                return
            }
            setLoading(false)
            toast.success('Đăng nhập thành công')
        }
    }

    const hanldeSubmit = (e) => {
        e.preventDefault()
        login()
    }

    return (
        <div className="LoginSection">
            <h2 className="title-page">Đăng nhập</h2>
            {role === ROLE_STUDENT ? (
                <div className="description">
                    Khu vực đăng nhập dành cho <span>sinh viên.</span>
                </div>
            ) : (
                role === ROLE_ADMIN && (
                    <div className="description">
                        Khu vực đăng nhập dành cho <span>nhân viên nhà trường.</span>
                    </div>
                )
            )}

            <form ref={form_ref} onSubmit={hanldeSubmit} className="login-form">
                <StudentUsernameFormGroup
                    onLogin={login}
                    ref={username_ref}
                    message={validation.username}
                />

                <PasswordFormGroup
                    onLogin={login}
                    ref={password_ref}
                    message={validation.password}
                />

                <button type="submit" className="submit-btn">
                    {loading ? (
                        <Spinner animation="border" style={{ width: '1.5rem', height: '1.5rem' }} />
                    ) : (
                        <>
                            <span>Đăng nhập</span>
                            <i className="bi bi-box-arrow-in-right"></i>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default LoginSection

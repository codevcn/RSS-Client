import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Stack from 'react-bootstrap/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useToast } from '../../hooks/toast'
import { logoutUser } from '../../redux/reducers/authReducers'
import { authService } from '../../services/AuthService'
import { AUTH_STATUS_AUTHENTICATED } from '../../utils/constants/auth'
import './NavBar.scss'

const navigations = [
    { label: 'Đăng nhập', path: '/login', nonAuth: true },
    { label: 'Đăng nhập với tư cách quản trị viên', path: '/login/admin', nonAuth: true },
    { label: 'Quản trị viên', path: '/admin' },
    { label: 'Thông tin sinh viên', path: '/student/infor' },
]

const DrawerNavSide = () => {
    const { authStatus } = useSelector(({ auth }) => auth)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const toast = useToast()
    const [showConfirmLogout, setShowConfirmLogout] = useState(false)

    const handleShowHideConfirmLogout = (show) => {
        setShowConfirmLogout(show)
    }

    const confirmLogout = () => {
        logoutUserHandler()
    }

    const hideShowDrawer = (open) => {
        setOpen(open)
    }

    const logoutUserHandler = async () => {
        try {
            await authService.logoutUser()
            dispatch(logoutUser())
        } catch (error) {
            toast.error('Không thể đăng xuất!')
        }
    }

    const checkAuthForRender = (nonAuth) => {
        return nonAuth || authStatus === AUTH_STATUS_AUTHENTICATED
    }

    return (
        <div className="drawer-side-bar">
            <div className="icon-btn" onClick={() => hideShowDrawer(true)}>
                <i className="bi bi-list"></i>
            </div>

            <Modal show={showConfirmLogout} onHide={() => handleShowHideConfirmLogout(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Bạn xác nhận muốn đăng xuất?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleShowHideConfirmLogout(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={confirmLogout}>
                        Xác nhận đăng xuất
                    </Button>
                </Modal.Footer>
            </Modal>

            <Offcanvas show={open} onHide={() => hideShowDrawer(false)} placement="end">
                <Offcanvas.Header>
                    <Offcanvas.Title>
                        <div className="drawer-title-box layout-navbar">
                            <div className="title">
                                <i className="bi bi-gear-fill"></i>
                                <span>Tính năng</span>
                            </div>
                            <div className="drawer-close-btn" onClick={() => hideShowDrawer(false)}>
                                <i className="bi bi-x-lg"></i>
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="drawer-body-box layout-navbar">
                        {navigations.map(
                            ({ path, label, nonAuth }) =>
                                checkAuthForRender(nonAuth) && (
                                    <div key={label} className="nav-btn">
                                        <NavLink to={path}>
                                            <span className="text">{label}</span>
                                        </NavLink>
                                    </div>
                                )
                        )}
                        {checkAuthForRender(false) && (
                            <div
                                className="nav-btn"
                                onClick={() => handleShowHideConfirmLogout(true)}
                            >
                                <div>
                                    <span className="text">Đăng xuất</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

const NavBar = () => {
    return (
        <div className="NavBar">
            <Stack className="home-title" direction="horizontal" gap={2} as={NavLink} to="/">
                <i className="bi bi-house-door-fill"></i>
                <p>Trang chủ</p>
            </Stack>

            <DrawerNavSide />
        </div>
    )
}

export default NavBar

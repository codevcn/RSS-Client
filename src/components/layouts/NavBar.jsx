import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Stack from 'react-bootstrap/Stack'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const navigations = [
    { label: 'Đăng nhập', path: '/login' },
    { label: 'Đăng nhập với tư cách quản trị viên', path: '/login/admin' },
    { label: 'Quản trị viên', path: '/admin' },
    { label: 'Thông tin sinh viên', path: '/student/infor' },
]

const DrawerNavSide = () => {
    const [open, setOpen] = useState(false)

    const hideShowDrawer = (open) => {
        setOpen(open)
    }

    return (
        <div className="drawer-side-bar">
            <div className="icon-btn" onClick={() => hideShowDrawer(true)}>
                <i className="bi bi-list"></i>
            </div>

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
                        {navigations.map(({ path, label }) => (
                            <div key={label} className="nav-btn">
                                <NavLink to={path}>
                                    <span className="text">{label}</span>
                                </NavLink>
                            </div>
                        ))}
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

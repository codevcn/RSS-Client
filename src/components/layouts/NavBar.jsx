import Stack from 'react-bootstrap/Stack'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
    return (
        <div className="NavBar">
            <div className="nav-bar">
                <Stack direction="horizontal" gap={2} as={NavLink} to="/">
                    <i className="bi bi-house-door-fill"></i>
                    <p>Trang chủ</p>
                </Stack>
            </div>
        </div>
    )
}

export default NavBar

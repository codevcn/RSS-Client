import { Outlet } from 'react-router-dom'
import NavBar from './layouts/NavBar'

const LayoutPage = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default LayoutPage

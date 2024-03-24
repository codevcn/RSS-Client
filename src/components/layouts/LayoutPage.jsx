import { Outlet } from 'react-router-dom'
import { nonGuardRoutes } from '../../configs/routes'
import { RouteGuard } from '../RouteGuard'
import NavBar from './NavBar'

const LayoutPage = () => {
    return (
        <>
            <NavBar />
            <RouteGuard nonGuardRoutes={nonGuardRoutes}>
                <Outlet />
            </RouteGuard>
        </>
    )
}

export default LayoutPage

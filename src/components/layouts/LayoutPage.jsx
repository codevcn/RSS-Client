import { Toaster } from 'react-hot-toast'
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
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    error: {
                        style: {
                            backgroundColor: 'rgba(255, 80, 80, 0.72)',
                            color: 'white',
                            fontWeight: 'bold',
                        },
                    },
                    success: {
                        style: {
                            backgroundColor: 'rgb(91, 231, 120, 0.72)',
                            color: 'white',
                            fontWeight: 'bold',
                        },
                    },
                }}
                reverseOrder={true}
            />
        </>
    )
}

export default LayoutPage

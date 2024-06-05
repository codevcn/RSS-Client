import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { Outlet } from 'react-router-dom'
import { nonGuardRoutes } from '../../configs/routes'
import { APP_LOADING_EVENT_NAME_OFF, APP_LOADING_EVENT_NAME_ON } from '../../utils/constants/util'
import { RouteGuard } from '../RouteGuard'
import NavBar from './NavBar'

const AppLoading = () => {
    const [show, setShow] = useState(false)

    const handleShowHide = (show) => {
        setShow(show)
    }

    useEffect(() => {
        document.addEventListener(APP_LOADING_EVENT_NAME_ON, () => {
            handleShowHide(true)
        })
        document.addEventListener(APP_LOADING_EVENT_NAME_OFF, () => {
            handleShowHide(false)
        })
        return () => {
            document.removeEventListener(APP_LOADING_EVENT_NAME_ON, () => {})
            document.removeEventListener(APP_LOADING_EVENT_NAME_OFF, () => {})
        }
    }, [])

    return (
        <Modal className="app-loading-modal" animation={false} show={show}>
            <Spinner style={{ color: 'white', margin: 'auto' }} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Modal>
    )
}

const LayoutPage = () => {
    return (
        <>
            <AppLoading />
            <NavBar />
            <RouteGuard nonGuardRoutes={nonGuardRoutes}>
                <Outlet />
            </RouteGuard>
        </>
    )
}

export default LayoutPage

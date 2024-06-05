import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast'
import {
    pickMajor,
    setClassesOfDatasets,
    setMajorsOfDatasets,
    setRoomsOfDatasets,
    setSubjectsOfDatasets,
    setTeachersOfDatasets,
} from '../../../redux/reducers/registerSessionReducers'
import { registerSessionService } from '../../../services/RegisterSessionService'
import {
    APP_LOADING_EVENT_NAME_OFF,
    APP_LOADING_EVENT_NAME_ON,
} from '../../../utils/constants/util'
import { HttpRequestErrorHandler } from '../../../utils/httpRequestErrorHandler'
import './AddRegisterSession.scss'

export const SelectMajors = () => {
    const [showDialog, setShowDialog] = useState(false)
    const { major, datasets } = useSelector(({ registerSession }) => registerSession)
    const dispatch = useDispatch()
    const majorsDataset = datasets.majors
    const toast = useToast()

    const fetchMajors = async () => {
        const majors = await registerSessionService.getMajors()
        dispatch(setMajorsOfDatasets(majors))
    }

    useEffect(() => {
        fetchMajors()
    }, [])

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const handlePick = async ({ id, code, name }) => {
        let apiSuccess = false
        let apiData
        document.dispatchEvent(new CustomEvent(APP_LOADING_EVENT_NAME_ON))
        try {
            const classes = await registerSessionService.getClassesOfMajor(id)
            const subjects = await registerSessionService.getSubjectsOfMajor(id)
            const teachers = await registerSessionService.getTeachersOfMajor(id)
            const rooms = await registerSessionService.getRoomsForRegisterSession()
            apiData = { classes, subjects, teachers, rooms }
            apiSuccess = true
        } catch (error) {
            const err = new HttpRequestErrorHandler(error)
            err.handleAxiosError()
            toast.error(err.message)
        }
        if (apiSuccess) {
            dispatch(setClassesOfDatasets(apiData.classes))
            dispatch(setSubjectsOfDatasets(apiData.subjects))
            dispatch(setTeachersOfDatasets(apiData.teachers))
            dispatch(setRoomsOfDatasets(apiData.rooms.map(({ roomCode }) => ({ roomCode }))))
            dispatch(pickMajor({ id, code, name }))
            handleShowDialog(false)
        }
        document.dispatchEvent(new CustomEvent(APP_LOADING_EVENT_NAME_OFF))
    }

    return (
        <div className="add-register-session-section major-section">
            <div className="add-register-session-section-title">
                <h2>Chọn ngành học</h2>
            </div>
            <button className="section-btn" onClick={() => handleShowDialog(true)}>
                <i className="bi bi-plus-square"></i>
                <label>Chọn ngành</label>
            </button>

            {major && (
                <div className="picked-result">
                    <div className="picked-result-text">Ngành đã chọn:</div>
                    <table className="picked-result-table">
                        <thead>
                            <tr>
                                <th>Mã ngành</th>
                                <th>Tên ngành</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={major.code}>
                                <td className="picked-result-table-cell code">{major.code}</td>
                                <td className="picked-result-table-cell name">{major.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <Modal
                show={showDialog}
                onHide={() => handleShowDialog(false)}
                dialogClassName="add-register-session-dialog"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chọn ngành</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="modal-table">
                        <thead>
                            <tr>
                                <th>Mã ngành</th>
                                <th>Tên ngành</th>
                                <th className="chosen">Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {majorsDataset &&
                                majorsDataset.map(({ id, code, name }) => (
                                    <tr key={code} onClick={() => handlePick({ id, code, name })}>
                                        <td className="modal-table-cell code">{code}</td>
                                        <td className="modal-table-cell name">{name}</td>
                                        <td className="modal-table-cell picked">
                                            {major && major.code === code ? (
                                                <i className="bi bi-check-circle-fill"></i>
                                            ) : (
                                                <i className="bi bi-circle"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer className="dialog-footer">
                    <button className="close-btn" onClick={() => handleShowDialog(false)}>
                        <span>
                            <i className="bi bi-x-circle"></i>
                        </span>
                        <span>Đóng</span>
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { pickClass } from '../../../redux/reducers/registerSessionReducers'
import './AddRegisterSession.scss'

export const SelectClassSection = () => {
    const [showDialog, setShowDialog] = useState(false)
    const { classesForStudent, datasets } = useSelector(({ registerSession }) => registerSession)
    const dispatch = useDispatch()
    const classesDataset = datasets.classes
    const pickingClass = classesForStudent.pickingClass

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const handlePick = ({ code, id }) => {
        dispatch(pickClass({ code, id }))
        handleShowDialog(false)
    }

    return (
        <div className="add-register-session-section class-section">
            <div className="add-register-session-section-title">
                <h2>Chọn lớp học</h2>
            </div>
            <button className="section-btn" onClick={() => handleShowDialog(true)}>
                <i className="bi bi-plus-square"></i>
                <label>Chọn lớp</label>
            </button>

            {pickingClass && (
                <div className="picked-result">
                    <div className="picked-result-text">Lớp đã chọn:</div>
                    <table className="picked-result-table">
                        <thead>
                            <tr>
                                <th>Mã lớp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={pickingClass.code}>
                                <td className="picked-result-table-cell code">
                                    {pickingClass.code}
                                </td>
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
                    <Modal.Title>Chọn lớp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="modal-table">
                        <thead>
                            <tr>
                                <th>Mã lớp</th>
                                <th className="chosen">Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classesDataset &&
                                classesDataset.map(({ code, id }) => (
                                    <tr key={code} onClick={() => handlePick({ code, id })}>
                                        <td className="modal-table-cell code">{code}</td>
                                        <td className="modal-table-cell picked">
                                            {pickingClass && pickingClass.code === code ? (
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

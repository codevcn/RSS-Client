import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import {
    pickAllSubjects,
    pickSubject,
    unPickAllSubjects,
    unPickSubject,
} from '../../../redux/reducers/registerSessionReducers'

export const SelectSubjectSection = () => {
    const [showDialog, setShowDialog] = useState(false)
    const { subjects, datasets } = useSelector(({ registerSession }) => registerSession)
    const dispatch = useDispatch()
    const subjectsDataset = datasets.subjects

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const handlePick = ({ code, name, id }) => {
        if (checkPicked(code)) {
            dispatch(unPickSubject({ code }))
        } else {
            dispatch(pickSubject({ code, name, id }))
        }
    }

    const checkPicked = (code) => {
        return (
            subjects &&
            subjects.length > 0 &&
            subjects.some((subject_data) => subject_data.code === code)
        )
    }

    const handlePickAll = () => {
        if (subjectsDataset && subjectsDataset.length > 0) {
            dispatch(pickAllSubjects(subjectsDataset))
        }
    }

    const handleUnPickAll = () => {
        if (subjectsDataset && subjectsDataset.length > 0) {
            dispatch(unPickAllSubjects(subjectsDataset))
        }
    }

    return (
        <div className="add-register-session-section add-subjects">
            <div className="add-register-session-section-title">
                <h2>Thêm môn học</h2>
            </div>
            <button className="section-btn" onClick={() => handleShowDialog(true)}>
                <i className="bi bi-plus-square"></i>
                <label>Thêm môn học</label>
            </button>

            {subjects && subjects.length > 0 && (
                <div className="picked-result">
                    <div className="picked-result-text">Các môn học đã chọn:</div>
                    <table className="picked-result-table">
                        <thead>
                            <tr>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(({ code, name }) => (
                                <tr key={code}>
                                    <td className="picked-result-table-cell code">{code}</td>
                                    <td className="picked-result-table-cell name">{name}</td>
                                </tr>
                            ))}
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
                    <Modal.Title>Thêm môn học</Modal.Title>
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
                            {subjectsDataset &&
                                subjectsDataset.map(({ code, name, id }) => (
                                    <tr key={code} onClick={() => handlePick({ code, name, id })}>
                                        <td className="modal-table-cell code">{code}</td>
                                        <td className="modal-table-cell name">{name}</td>
                                        <td className="modal-table-cell picked">
                                            {checkPicked(code) ? (
                                                <i className="bi bi-check-square-fill"></i>
                                            ) : (
                                                <i className="bi bi-square"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="pick-actions">
                        <button className="un-pick-all action-btn" onClick={handleUnPickAll}>
                            <span>
                                <i className="bi bi-circle"></i>
                            </span>
                            <span>Bỏ chọn tất cả</span>
                        </button>
                        <button className="pick-all action-btn" onClick={handlePickAll}>
                            <span>
                                <i className="bi bi-check-all"></i>
                            </span>
                            <span>Chọn tất cả</span>
                        </button>
                    </div>
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

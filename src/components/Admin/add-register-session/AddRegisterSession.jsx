import moment from 'moment'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { majors_dataset, subjects_dataset } from '../../../lib/test'
import {
    pickAllSubjects,
    pickMajor,
    pickSubject,
    unPickAllSubjects,
    unPickSubject,
} from '../../../redux/reducers/registerSessionReducers'
import './AddRegisterSession.scss'
import { CreditSection } from './CreditSection'
import { FinalResult } from './FinalResult'
import { ScheduleSection } from './ScheduleSection'
import { TeacherSection } from './TeacherSection'

const YearSection = () => {
    return (
        <div className="year-section">
            <span>{`Mở đợt đăng kí môn học cho khóa ${moment().year()} - ${moment().year() + 1}:`}</span>
        </div>
    )
}

const MajorSection = () => {
    const [showDialog, setShowDialog] = useState(false)
    const major = useSelector(({ registerSession }) => registerSession.data.major)
    const dispatch = useDispatch()

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const handlePick = ({ code, name }) => {
        dispatch(pickMajor({ code, name }))
        handleShowDialog(false)
    }

    return (
        <div className="add-register-session-section major-section">
            <div className="section-title">
                <i className="bi bi-chevron-double-right"></i>
                <label>Chọn ngành học</label>
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
                                <th>Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {majors_dataset.map(({ code, name }) => (
                                <tr key={code} onClick={() => handlePick({ code, name })}>
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

const SubjectSection = () => {
    const [showDialog, setShowDialog] = useState(false)
    const subjects = useSelector(({ registerSession }) => registerSession.data.subjects)
    const dispatch = useDispatch()

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const handlePick = ({ code, name }) => {
        if (checkPicked(code)) {
            dispatch(unPickSubject({ code }))
        } else {
            dispatch(pickSubject({ code, name }))
        }
    }

    const checkPicked = (code) => {
        return subjects && subjects.some((subject_data) => subject_data.code === code)
    }

    const performPickAll = () => {
        dispatch(pickAllSubjects(subjects_dataset))
    }

    const performUnPickAll = () => {
        dispatch(unPickAllSubjects(subjects_dataset))
    }

    return (
        <div className="add-register-session-section subject-section">
            <div className="section-title">
                <i className="bi bi-chevron-double-right"></i>
                <label>Thêm môn học</label>
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
                                <th>Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects_dataset.map(({ code, name }) => (
                                <tr key={code} onClick={() => handlePick({ code, name })}>
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
                        <button className="un-pick-all action-btn" onClick={performUnPickAll}>
                            <span>
                                <i className="bi bi-circle"></i>
                            </span>
                            <span>Bỏ chọn tất cả</span>
                        </button>
                        <button className="pick-all action-btn" onClick={performPickAll}>
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

const Divider = () => <div className="section-divider"></div>

export const AddRegisterSession = () => {
    return (
        <div className="AddRegisterSession">
            <div className="add-register-session-container">
                <div className="add-register-session-title">
                    <h2>MỞ ĐỢT ĐĂNG KÍ MÔN HỌC</h2>
                </div>

                <div className="add-register-session-sections">
                    <YearSection />
                    <Divider />
                    <MajorSection />
                    <Divider />
                    <SubjectSection />
                    <Divider />
                    <ScheduleSection />
                    <Divider />
                    <CreditSection />
                    <Divider />
                    <TeacherSection />
                    <Divider />
                    <FinalResult />
                </div>
            </div>
        </div>
    )
}

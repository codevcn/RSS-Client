import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { teachers_dataset } from '../../../lib/test.js'
import { pickTeacher, unPickTeacher } from '../../../redux/reducers/registerSessionReducers.js'

export const SelectTeachers = ({ pickedSubject, teachers }) => {
    const [showDialog, setShowDialog] = useState(false)
    const dispatch = useDispatch()
    const [message, setMessage] = useState(null)

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const checkPicked = (teacherCode) =>
        teachers && teachers.length > 0 && teachers.some(({ code }) => code === teacherCode)

    const handlePick = (teacherCode, teacherName) => {
        setMessage(null)
        if (checkPicked(teacherCode)) {
            dispatch(
                unPickTeacher({
                    teacherCode,
                    subjectCode: pickedSubject.code,
                })
            )
        } else {
            if (!teachers || teachers.length < 2) {
                dispatch(
                    pickTeacher({
                        teacher: {
                            code: teacherCode,
                            name: teacherName,
                        },
                        subject: {
                            code: pickedSubject.code,
                        },
                    })
                )
            } else {
                setMessage('Mỗi môn học không được phép có hơn 2 giảng viên giảng dạy!')
            }
        }
    }

    return (
        <>
            <button type="button" className="section-btn" onClick={() => handleShowDialog(true)}>
                <i className="bi bi-plus-square"></i>
                <label>Thêm giảng viên</label>
            </button>

            <Modal
                show={showDialog}
                onHide={() => handleShowDialog(false)}
                dialogClassName="add-register-session-dialog teacher"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chọn giảng viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && (
                        <div className="dialog-message">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <span>{message}</span>
                        </div>
                    )}
                    <table className="modal-table">
                        <thead>
                            <tr>
                                <th>Mã giảng viên</th>
                                <th>Tên giảng viên</th>
                                <th className="chosen">Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers_dataset.map(({ code, name }) => (
                                <tr key={code} onClick={() => handlePick(code, name)}>
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
        </>
    )
}

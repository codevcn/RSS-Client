import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export const SelectTeachers = ({ pickedTeacher, teachersDataset, onPick }) => {
    const [showDialog, setShowDialog] = useState(false)

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const checkPicked = (teacherCode) => {
        return pickedTeacher && pickedTeacher.code === teacherCode
    }

    const handlePick = (teacherCode, teacherName, teacherId) => {
        onPick({
            code: teacherCode,
            name: teacherName,
            id: teacherId,
        })
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
                    <table className="modal-table">
                        <thead>
                            <tr>
                                <th>Mã giảng viên</th>
                                <th>Tên giảng viên</th>
                                <th className="chosen">Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachersDataset &&
                                teachersDataset.length > 0 &&
                                teachersDataset.map(({ code, name, id }) => (
                                    <tr key={code} onClick={() => handlePick(code, name, id)}>
                                        <td className="modal-table-cell code">{code}</td>
                                        <td className="modal-table-cell name">{name}</td>
                                        <td className="modal-table-cell picked">
                                            {checkPicked(code) ? (
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
        </>
    )
}

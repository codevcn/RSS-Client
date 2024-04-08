import { useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { teachers_dataset } from '../../../lib/test'
import { pickTeacher, unPickTeacher } from '../../../redux/reducers/registerSessionReducers'

const TeachersDialog = ({ pickedSubject }) => {
    const { teachers } = useSelector(({ registerSession }) => registerSession.data)
    const [showDialog, setShowDialog] = useState(false)
    const dispatch = useDispatch()
    const [message, setMessage] = useState(null)

    const handleShowDialog = (show) => {
        setShowDialog(show)
    }

    const checkPicked = (code) => {
        return (
            teachers &&
            teachers.some(
                (teacher) => teacher.code === code && teacher.subject.code === pickedSubject.code
            )
        )
    }

    const handlePick = ({ teacherCode, teacherName }) => {
        if (checkPicked(teacherCode)) {
            dispatch(unPickTeacher({ code: teacherCode, subject: { code: pickedSubject.code } }))
        } else {
            try {
                dispatch(
                    pickTeacher({
                        code: teacherCode,
                        name: teacherName,
                        subject: {
                            code: pickedSubject.code,
                            name: pickedSubject.name,
                        },
                    })
                )
                setMessage(null)
            } catch (error) {
                setMessage(error.message)
            }
        }
    }

    return (
        <>
            <button className="section-btn" onClick={() => handleShowDialog(true)}>
                <i className="bi bi-plus-square"></i>
                <label>Thêm giảng viên</label>
            </button>

            <Modal
                show={showDialog}
                onHide={() => handleShowDialog(false)}
                dialogClassName="add-register-session-dialog"
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
                                <th>Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers_dataset.map(({ code, name }) => (
                                <tr
                                    key={code}
                                    onClick={() =>
                                        handlePick({ teacherCode: code, teacherName: name })
                                    }
                                >
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

const Form = ({ pickedSubject }) => {
    const { teachers } = useSelector(({ registerSession }) => registerSession.data)

    const teacherSavedData = useMemo(() => {
        if (pickedSubject === null || teachers === null) return null
        return teachers.filter(({ subject }) => pickedSubject.code === subject.code)
    }, [pickedSubject, teachers])

    const saveData = () => {}

    return (
        <div className="main-form">
            <div className="form-group form-group-subject-setting-up">
                <label>Bạn đang chọn giảng viên cho môn:</label>
                <div className="subject-setting-up">
                    {pickedSubject ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã môn học</th>
                                    <th>Tên môn học</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="picked-result-table-cell code">
                                        {pickedSubject.code}
                                    </td>
                                    <td className="picked-result-table-cell name">
                                        {pickedSubject.name}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <>
                            <i className="bi bi-question-circle-fill"></i>
                            <span>Bạn chưa chọn môn học để nhập thông tin giảng viên...</span>
                        </>
                    )}
                </div>
            </div>

            {pickedSubject && (
                <div className="teacher-setting-up">
                    {teacherSavedData && teacherSavedData.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã giảng viên</th>
                                    <th>Tên giảng viên</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacherSavedData.map((teacher) => (
                                    <tr key={teacher.code}>
                                        <td className="picked-result-table-cell code">
                                            {teacher.code}
                                        </td>
                                        <td className="picked-result-table-cell name">
                                            {teacher.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <TeachersDialog pickedSubject={pickedSubject} />
                </div>
            )}

            {teacherSavedData && (
                <button className="save-data-btn" onClick={saveData}>
                    Lưu
                </button>
            )}
        </div>
    )
}

const SubjectsStatus = ({ pickedSubject, onChooseSubject }) => {
    const { subjects } = useSelector(({ registerSession }) => registerSession.data)

    const chooseSubject = ({ code, name }) => {
        onChooseSubject({ code, name })
    }

    return (
        <div className="schedule-main-section-left-side">
            <div className="subjects-status">
                <div className="picked-result-text">Các môn học đã thêm:</div>
                <table className="picked-result-table">
                    <thead>
                        <tr>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Đang nhập lịch học</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subjects &&
                            subjects.length > 0 &&
                            subjects.map(({ code, name }) => (
                                <tr key={code} onClick={() => chooseSubject({ code, name })}>
                                    <td className="picked-result-table-cell code">{code}</td>
                                    <td className="picked-result-table-cell name">{name}</td>
                                    <td className="modal-table-cell picked">
                                        {pickedSubject && pickedSubject.code === code ? (
                                            <i className="bi bi-check-circle-fill"></i>
                                        ) : (
                                            <i className="bi bi-circle"></i>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const TeacherSection = () => {
    const { subjects } = useSelector(({ registerSession }) => registerSession.data)
    const [pickedSubject, setPickedSubject] = useState(null)

    useEffect(() => {
        if (pickedSubject !== null) {
            subjectSettingUpHandler(pickedSubject)
        }
    }, [subjects])

    const subjectSettingUpHandler = (data) => {
        if (data === null || subjects === null) return setPickedSubject(null)
        const picked_subject = subjects.find(({ code }) => code === data.code)
        if (picked_subject) {
            setPickedSubject(picked_subject)
        } else {
            setPickedSubject(null)
        }
    }

    return (
        <div className="add-register-session-section schedule-section">
            <div className="section-title">
                <i className="bi bi-chevron-double-right"></i>
                <label>Chọn giảng viên</label>
            </div>

            <section className="form-section">
                <SubjectsStatus
                    pickedSubject={pickedSubject}
                    onChooseSubject={subjectSettingUpHandler}
                />
                <Form pickedSubject={pickedSubject} />
            </section>
        </div>
    )
}

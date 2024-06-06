import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './AddRegisterSession.scss'
import { TeacherSection } from './SubjectSchedule.jsx'

const SubjectsStatus = ({ pickedSubject, onChooseSubject }) => {
    const { subjects } = useSelector(({ registerSession }) => registerSession)

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
                            <th className="chosen">Môn học đang được nhập</th>
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

const SubjectSettingUp = ({ pickedSubject }) => {
    return (
        <div className="subject-setting-up-section">
            <label>Bạn đang nhập thông tin cho môn học:</label>
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
                    <div className="unpick-subject">
                        <i className="bi bi-question-circle-fill"></i>
                        <span>Bạn chưa chọn môn học để nhập lịch học...</span>
                    </div>
                )}
            </div>
        </div>
    )
}

const SectionDivider = ({ title }) => (
    <div className="section-divider">
        <p>{title}</p>
    </div>
)

export const SubjectInfoSection = () => {
    const [pickedSubject, setPickedSubject] = useState(null)
    const { subjects } = useSelector(({ registerSession }) => registerSession)

    useEffect(() => {
        subjectSettingUpHandler(pickedSubject)
    }, [subjects])

    const subjectSettingUpHandler = (pre_picked_subject) => {
        if (pre_picked_subject === null || subjects === null) {
            setPickedSubject(null)
            return
        }
        const picked_subject = subjects.find(({ code }) => code === pre_picked_subject.code)
        setPickedSubject(picked_subject || null)
    }

    return (
        <div className="add-register-session-section type-subjects-info">
            <div className="add-register-session-section-title">
                <h2>Nhập thông tin về lịch học cho môn học trong học kì</h2>
            </div>
            <SubjectsStatus
                pickedSubject={pickedSubject}
                onChooseSubject={subjectSettingUpHandler}
            />
            <SubjectSettingUp pickedSubject={pickedSubject} />

            <section className="type-subjects-info-section">
                {pickedSubject && <SectionDivider title="Thông tin về lịch dạy của môn học" />}
                <TeacherSection pickedSubject={pickedSubject} />
            </section>
        </div>
    )
}

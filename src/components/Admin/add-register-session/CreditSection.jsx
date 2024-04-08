import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MAX_CREDITS_COUNT, MIN_CREDITS_COUNT } from '../../../utils/constants/subject'

const get_form_groups = ({ creditsCount }) => [
    {
        id: 'credit',
        label: 'Số tín chỉ',
        helper: 'Nhập số tín chỉ',
        value: creditsCount,
        inputType: 'number',
    },
]

const Form = ({ pickedSubject }) => {
    const { credits } = useSelector(({ registerSession }) => registerSession.data)
    const dispatch = useDispatch()

    const creditFormGroups = useMemo(() => {
        if (pickedSubject === null) return null
        if (credits === null) return get_form_groups({})
        return get_form_groups(
            credits.find(({ subjectCode }) => pickedSubject.code === subjectCode) || {}
        )
    }, [pickedSubject, credits])

    const saveData = () => {}

    return (
        <div className="main-form">
            <div className="form-group form-group-subject-setting-up">
                <label>Bạn đang nhập thông tin tín chỉ cho môn:</label>
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
                            <span>Bạn chưa chọn môn học để nhập tín chỉ...</span>
                        </>
                    )}
                </div>
            </div>

            {creditFormGroups &&
                creditFormGroups.map(({ label, id, helper, value, inputType }) => (
                    <div key={id} className={`form-group ${id}`}>
                        <label>{label + ':'}</label>
                        <div className="input-wrapper">
                            <input
                                type={inputType}
                                placeholder={helper + '...'}
                                defaultValue={value || ''}
                                min={MIN_CREDITS_COUNT}
                                max={MAX_CREDITS_COUNT}
                            />
                        </div>
                        <div className="message"></div>
                    </div>
                ))}

            {creditFormGroups && (
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

export const CreditSection = () => {
    const [pickedSubject, setPickedSubject] = useState(null)
    const { subjects } = useSelector(({ registerSession }) => registerSession.data)

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
                <label>Nhập tín chỉ cho các môn học</label>
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

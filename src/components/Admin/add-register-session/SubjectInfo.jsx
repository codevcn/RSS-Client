import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast.js'
import { FillFormWithDataset } from '../../../lib/test.jsx'
import { setSubjectInfo } from '../../../redux/reducers/registerSessionReducers.js'
import './AddRegisterSession.scss'
import { TeacherSection } from './SubjectSchedule.jsx'
import {
    creditsCount_inputId,
    partGroup_inputId,
    subject_info_form_groups,
    teamGroup_inputId,
} from './sharings.js'

const TypeSubjectInfoSection = ({ pickedSubject, pickingClass }) => {
    const { subjectInfos } = useSelector(({ registerSession }) => registerSession)
    const {
        register,
        formState: { errors },
        setValue,
        setError,
        handleSubmit,
    } = useForm()
    const dispatch = useDispatch()
    const toast = useToast()

    const fillForm = ({ teamGroup, creditsCount, partGroup }) => {
        const config = { shouldValidate: false }
        setValue(teamGroup_inputId, teamGroup || '', config)
        setValue(creditsCount_inputId, creditsCount || '', config)
        setValue(partGroup_inputId, partGroup || '', config)
    }

    useEffect(() => {
        if (pickedSubject === null) return
        if (subjectInfos === null) return
        const schedule = subjectInfos.find(
            ({ subject, forClass }) =>
                pickedSubject.code === subject.code && pickingClass.code === forClass.code
        )
        fillForm(schedule || {})
    }, [pickedSubject, subjectInfos])

    const validateForm = ({ teamGroup, partGroup }) => {
        const validation_errors = []

        if (!teamGroup) {
            validation_errors.push({
                id: teamGroup_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { min, max, label } = subject_info_form_groups.find(
                ({ id }) => id === teamGroup_inputId
            )
            if (teamGroup * 1 < min || teamGroup * 1 > max || !/^[0-9]{1,2}$/.test(teamGroup)) {
                validation_errors.push({
                    id: teamGroup_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }
        if (!partGroup) {
            validation_errors.push({
                id: partGroup_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { min, max, label } = subject_info_form_groups.find(
                ({ id }) => id === partGroup_inputId
            )
            if (partGroup * 1 < min || partGroup * 1 > max || !/^[0-9]{1,2}$/.test(partGroup)) {
                validation_errors.push({
                    id: partGroup_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }

        const is_invalid = validation_errors.length > 0

        if (is_invalid) {
            for (const err of validation_errors) {
                setError(err.id, { message: err.message })
            }

            throw new Error('Không thể lưu thông tin, biểu mẫu nhập không hợp lệ!')
        }
    }

    const submitForm = (data) => {
        const { teamGroup, partGroup } = data

        try {
            if (!pickingClass) {
                throw new Error('Lớp học chưa được chọn')
            }
            validateForm(data)
        } catch (error) {
            toast.error(error.message)
            return
        }

        dispatch(
            setSubjectInfo({
                subject: {
                    code: pickedSubject.code,
                },
                teamGroup,
                partGroup,
                forClass: pickingClass,
            })
        )

        toast.success('Lưu thông tin môn học thành công!')
    }

    return (
        <section className="form-section schedule">
            <FillFormWithDataset
                onclick={() => {
                    fillForm({
                        teamGroup: '1',
                        partGroup: '2',
                        creditsCount: '4',
                    })
                }}
            />

            <form onSubmit={handleSubmit(submitForm)} className="main-form-section">
                {pickedSubject &&
                    subject_info_form_groups.map(({ label, id, helper, inputType }) => (
                        <div key={id} className={`form-group ${id}`}>
                            <label htmlFor={id}>{label + ':'}</label>
                            <div className="input-wrapper">
                                <input
                                    type={inputType}
                                    id={id}
                                    placeholder={helper + '...'}
                                    {...register(id)}
                                />
                            </div>
                            <div className="message">
                                {errors[id] && (errors[id].message || '')}
                            </div>
                        </div>
                    ))}

                {pickedSubject && (
                    <button type="submit" className="save-data-btn">
                        <span>
                            <i className="bi bi-check-circle-fill"></i>
                        </span>
                        <span>Lưu</span>
                    </button>
                )}
            </form>
        </section>
    )
}

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
    const {
        subjects,
        classesForStudent: { pickingClass },
    } = useSelector(({ registerSession }) => registerSession)
    const toast = useToast()

    useEffect(() => {
        subjectSettingUpHandler(pickedSubject)
    }, [subjects])

    const subjectSettingUpHandler = (pre_picked_subject) => {
        if (pre_picked_subject === null || subjects === null) {
            setPickedSubject(null)
            return
        }
        if (!pickingClass) {
            toast.error('Lớp học chưa được chọn')
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
                {pickedSubject && <SectionDivider title="Thông tin của môn học" />}
                <TypeSubjectInfoSection pickedSubject={pickedSubject} pickingClass={pickingClass} />
                {pickedSubject && <SectionDivider title="Thông tin về lịch học của môn học" />}
                <TeacherSection pickedSubject={pickedSubject} />
            </section>
        </div>
    )
}

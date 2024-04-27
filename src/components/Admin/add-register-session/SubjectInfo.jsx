import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast.js'
import { FillFormWithDataset } from '../../../lib/test.jsx'
import { setSubjectInfo, setUpCredit } from '../../../redux/reducers/registerSessionReducers.js'
import {
    creditsCount_inputId,
    nameOfClass_inputId,
    schedule_form_groups,
    teamGroup_inputId,
} from './sharings.js'

export const SubjectInfoSection = ({ pickedSubject }) => {
    const { subjectInfos, credits } = useSelector(({ registerSession }) => registerSession)
    const {
        register,
        formState: { errors },
        setValue,
        setError,
        handleSubmit,
    } = useForm()
    const dispatch = useDispatch()
    const toast = useToast()

    const fillForm = ({ teamGroup, nameOfClass, creditsCount }) => {
        const config = { shouldValidate: false }
        teamGroup && setValue(teamGroup_inputId, teamGroup, config)
        nameOfClass && setValue(nameOfClass_inputId, nameOfClass, config)
        creditsCount && setValue(creditsCount_inputId, creditsCount, config)
    }

    useEffect(() => {
        if (pickedSubject === null) return
        if (subjectInfos === null) return
        const schedule = subjectInfos.find(({ subject }) => pickedSubject.code === subject.code)
        const credit = credits?.find(({ subject }) => pickedSubject.code === subject.code)
        fillForm(schedule ? { ...schedule, creditsCount: credit?.count } : {})
    }, [pickedSubject, subjectInfos])

    const validateForm = ({ teamGroup, nameOfClass, creditsCount }) => {
        const validation_errors = []

        if (!teamGroup) {
            validation_errors.push({
                id: teamGroup_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        }
        if (!nameOfClass) {
            validation_errors.push({
                id: nameOfClass_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        }
        if (!creditsCount) {
            validation_errors.push({
                id: creditsCount_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { min, max, label } = schedule_form_groups.find(
                ({ id }) => id === creditsCount_inputId
            )
            if (creditsCount < min || creditsCount > max || !/^[0-9]{1,2}$/.test(creditsCount)) {
                validation_errors.push({
                    id: creditsCount_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }

        const is_invalid = validation_errors.length > 0

        if (is_invalid) {
            for (const err of validation_errors) {
                setError(err.id, { message: err.message })
            }
        }

        return is_invalid
    }

    const submitForm = (data) => {
        console.log('>>> data >>>', data)
        const { teamGroup, nameOfClass, creditsCount } = data

        if (validateForm(data)) {
            toast.error('Không thể lưu thông tin, biểu mẫu nhập không hợp lệ!')
            return
        }

        dispatch(
            setSubjectInfo({
                subject: {
                    code: pickedSubject.code,
                    name: pickedSubject.name,
                },
                teamGroup,
                nameOfClass,
            })
        )
        dispatch(
            setUpCredit({
                count: creditsCount,
                subject: { code: pickedSubject.code },
            })
        )

        toast.success('Lưu thông tin môn học thành công!')
    }

    return (
        <section className="form-section schedule">
            <FillFormWithDataset
                onclick={() => {
                    fillForm({
                        teamGroup: '01-02',
                        dayOfWeek: '1',
                        nameOfClass: 'D21CQCN01-N',
                        numberOfSessions: 2,
                        roomName: '2A23',
                        startingSession: '1',
                        creditsCount: '4',
                    })
                }}
            />

            <form onSubmit={handleSubmit(submitForm)} className="main-form-section">
                {pickedSubject &&
                    schedule_form_groups.map(({ label, id, helper, inputType }) => (
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

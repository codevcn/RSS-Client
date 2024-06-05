import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useToast } from '../../../hooks/toast'
import { setRegisterSessionInfo } from '../../../redux/reducers/registerSessionReducers'
import './AddRegisterSession.scss'
import { FinalResult } from './FinalResult'
import { SelectClassSection } from './SelectClasses'
import { SelectMajors } from './SelectMajors'
import { SelectSubjectSection } from './SelectSubjects'
import {
    beginTime_inputId,
    endTime_inputId,
    register_session_info_form_groups,
    regSessCode_inputId,
} from './sharings'
import { SubjectInfoSection } from './SubjectInfo'
import { TypedSchedule } from './TypedSchedule'

const YearSection = () => {
    return (
        <div className="year-section">
            <span>{`Mở đợt đăng kí môn học cho khóa ${moment().year()} - ${moment().year() + 1}:`}</span>
        </div>
    )
}

const RegisterSessionSectionInfo = () => {
    const {
        register,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm()
    const dispatch = useDispatch()
    const toast = useToast()

    const validateForm = ({ regSessCode, beginTime, endTime }) => {
        const validation_errors = []

        if (!regSessCode) {
            validation_errors.push({
                id: regSessCode_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        }
        if (!beginTime) {
            validation_errors.push({
                id: beginTime_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { label, format } = register_session_info_form_groups.find(
                ({ id }) => id === beginTime_inputId
            )
            if (!moment(beginTime, format, true).isValid()) {
                validation_errors.push({
                    id: beginTime_inputId,
                    message: `Trường "${label}" phải tuân thủ định dạng ${format}`,
                })
            }
        }
        if (!endTime) {
            validation_errors.push({
                id: endTime_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { label, format } = register_session_info_form_groups.find(
                ({ id }) => id === endTime_inputId
            )
            if (!moment(endTime, format, true).isValid()) {
                validation_errors.push({
                    id: endTime_inputId,
                    message: `Trường "${label}" phải tuân thủ định dạng ${format}`,
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

    const submitForm = async (data) => {
        const { regSessCode, beginTime, endTime } = data

        try {
            validateForm(data)
        } catch (error) {
            toast.error(error.message)
            return
        }

        dispatch(
            setRegisterSessionInfo({
                regSessCode,
                beginTime: moment(beginTime, 'DD/MM/YYYY HH:mm').toDate().getTime(),
                endTime: moment(endTime, 'DD/MM/YYYY HH:mm').toDate().getTime(),
            })
        )
        toast.success('Đã lưu thông tin')
    }

    return (
        <div className="register-session-info-section">
            <div className="register-session-info-section-title">
                <h2>Thông tin về đợt đăng ký</h2>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className="register-session-info">
                {register_session_info_form_groups.map(({ label, id, helper, inputType }) => (
                    <div key={id} className={`form-group ${id}`}>
                        <label htmlFor={id}>{label + ':'}</label>
                        <div className="input-wrapper">
                            <input
                                type={inputType}
                                id={id}
                                placeholder={helper}
                                {...register(id)}
                            />
                        </div>
                        <div className="message">{errors[id] && (errors[id].message || '')}</div>
                    </div>
                ))}
                <button type="submit" className="save-data-btn">
                    <span>
                        <i className="bi bi-check-circle-fill"></i>
                    </span>
                    <span>Lưu</span>
                </button>
            </form>
        </div>
    )
}

export const AddRegisterSession = () => {
    return (
        <div id="AddRegisterSession">
            <div className="add-register-session-container">
                <div className="add-register-session-title">
                    <h2>MỞ ĐỢT ĐĂNG KÍ MÔN HỌC</h2>
                </div>

                <section className="add-register-session-sections-container">
                    <YearSection />
                    <FinalResult />
                    <RegisterSessionSectionInfo />
                    <section className="typed-schedule-and-adding-sections">
                        <TypedSchedule />
                        <section className="add-register-session-sections">
                            <SelectMajors />
                            <SelectClassSection />
                            <SelectSubjectSection />
                            <SubjectInfoSection />
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}

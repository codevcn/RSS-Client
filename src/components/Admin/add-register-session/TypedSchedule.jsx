import moment from 'moment'
import { useMemo, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast'
import {
    removeSchedule,
    setChangingSchedule,
} from '../../../redux/reducers/registerSessionReducers'
import { registerSessionService } from '../../../services/RegisterSessionService'
import { HttpRequestErrorHandler } from '../../../utils/httpRequestErrorHandler'

const SectionDivider = ({ title, styling, color }) => {
    return (
        <div className="section-divider" style={styling || {}}>
            <p style={color ? { color } : {}}>{title}</p>
        </div>
    )
}

const TypedSchedule = ({ typedSchedule, index }) => {
    const dispatch = useDispatch()
    const { schedule, subject } = typedSchedule
    const {
        dayOfWeek,
        numberOfSessions,
        roomCode,
        startingSession,
        teacher,
        forClass,
        slotsCount,
        partGroup,
        teamGroup,
    } = schedule

    const beginDate = new Date(schedule.beginDate * 1)
    const endDate = new Date(schedule.endDate * 1)

    const removeScheduleHandler = () => {
        dispatch(removeSchedule({ scheduleID: schedule.id }))
    }

    const setChangingScheduleHandler = () => {
        dispatch(setChangingSchedule({ scheduleID: schedule.id }))
    }

    return (
        <Accordion.Item eventKey={index} className="typed-schedule-section">
            <Accordion.Header>
                <SectionDivider title={subject.name} color="black" />
            </Accordion.Header>

            <Accordion.Body>
                <div className="typed-schedule-section-info">
                    <div className="info-item">
                        <strong>Mã môn học:</strong>
                        <span>{subject.code}</span>
                    </div>
                    <div className="info-item">
                        <strong>Tên môn học:</strong>
                        <span>{subject.name}</span>
                    </div>
                </div>

                <section className="subject-schedule">
                    <SectionDivider title={`Lịch dạy số ${index + 1}`} />

                    <div className="info-item">
                        <strong>Nhóm:</strong>
                        <span>{teamGroup}</span>
                    </div>
                    <div className="info-item">
                        <strong>Tổ:</strong>
                        <span>{partGroup}</span>
                    </div>
                    <div className="info-item">
                        <strong>Tên giảng viên:</strong>
                        <span>{teacher.name}</span>
                    </div>
                    <div className="info-item">
                        <strong>Mã giảng viên:</strong>
                        <span>{teacher.code}</span>
                    </div>
                    <div className="info-item">
                        <strong>Lớp:</strong>
                        <span>{forClass}</span>
                    </div>
                    <div className="info-item">
                        <strong>Thứ:</strong>
                        <span>{dayOfWeek}</span>
                    </div>
                    <div className="info-item">
                        <strong>Số tiết:</strong>
                        <span>{numberOfSessions}</span>
                    </div>
                    <div className="info-item">
                        <strong>Tiết bắt đầu:</strong>
                        <span>{startingSession}</span>
                    </div>
                    <div className="info-item">
                        <strong>Phòng:</strong>
                        <span>{roomCode}</span>
                    </div>
                    <div className="info-item">
                        <strong>Số slot:</strong>
                        <span>{slotsCount}</span>
                    </div>
                    <div className="info-item">
                        <strong>Thời gian học:</strong>
                        <span>{`Từ ${beginDate.getDate()}/${beginDate.getMonth() + 1}/${beginDate.getFullYear()}`}</span>
                        <span>{` đến ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}.`}</span>
                    </div>

                    <div className="subject-schedule-actions">
                        <button className="schedule-action remove" onClick={removeScheduleHandler}>
                            Xóa
                        </button>
                        <button
                            className="schedule-action change"
                            onClick={setChangingScheduleHandler}
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                </section>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export const TypedSchedules = () => {
    const { major, subjects, subjectSchedules, registerSessionInfo, datasets } = useSelector(
        ({ registerSession }) => registerSession
    )
    const [submitting, setSubmitting] = useState(false)
    const [smResult, setSmResult] = useState(null)
    const toast = useToast()
    console.log('>>> final schedules >>>', {
        major,
        subjects,
        subjectSchedules,
        registerSessionInfo,
        datasets,
    })

    const refactoredSchedules = useMemo(() => {
        if (
            major &&
            registerSessionInfo &&
            subjects &&
            subjects.length > 0 &&
            subjectSchedules &&
            subjectSchedules.length > 0
        ) {
            let scheduleBySubject = subjectSchedules
            return scheduleBySubject
        }

        return null
    }, [major, subjects, subjectSchedules, registerSessionInfo])
    console.log('>>> refactored schedules >>>', refactoredSchedules)

    const submitSaveSchedule = async () => {
        setSubmitting(true)

        const data = {
            registerSessionDTO: {
                regSessCode: registerSessionInfo.regSessCode,
                beginTime: registerSessionInfo.beginTime,
                endTime: registerSessionInfo.endTime,
                termCode: registerSessionInfo.termCode,
                majorID: major.id,
            },
            scheduledSubjectDTOs: subjectSchedules,
        }
        console.log('>>> data send to BE >>>', data)

        let apiSuccess = false
        try {
            await registerSessionService.addRegisterSession(data)
            apiSuccess = true
        } catch (error) {
            const err = new HttpRequestErrorHandler(error)
            err.handleAxiosError()
            toast.error(err.message)
        }

        if (apiSuccess) {
            toast.success('Đã lưu thông tin lịch học thành công!')
            setSmResult({ status: 'success', message: 'Đã lưu thông tin lịch học thành công!' })
        }

        setSubmitting(false)
    }

    return (
        <section className="typed-schedules">
            <div className="typed-schedules-title">
                <h2>Dữ liệu đợt đăng ký đã nhập</h2>
            </div>

            <SectionDivider title="Thông tin đợt đăng ký" />

            <div className="final-register-session-info">
                {major && (
                    <div className="final-register-session-info-item">
                        <h2>Ngành:</h2>
                        <span>{major.name}</span>
                    </div>
                )}
                {registerSessionInfo && (
                    <>
                        <div className="final-register-session-info-item">
                            <h2>Mã đợt đăng ký:</h2>
                            <span>{registerSessionInfo.regSessCode}</span>
                        </div>
                        <div className="final-register-session-info-item">
                            <h2>Mã học kì:</h2>
                            <span>{registerSessionInfo.termCode}</span>
                        </div>
                        <div className="final-register-session-info-item">
                            <h2>Thời gian bắt đầu:</h2>
                            <span>
                                {moment(registerSessionInfo.beginTime).format('DD/MM/YYYY HH:mm')}
                            </span>
                        </div>
                        <div className="final-register-session-info-item">
                            <h2>Thời gian kết thúc:</h2>
                            <span>
                                {moment(registerSessionInfo.endTime).format('DD/MM/YYYY HH:mm')}
                            </span>
                        </div>
                    </>
                )}
            </div>

            <SectionDivider
                styling={{ margin: '25px 0' }}
                title="Thông tin và lịch học của các môn học"
            />

            {refactoredSchedules && refactoredSchedules.length > 0 && (
                <>
                    <Accordion className="typed-schedule-sections">
                        {refactoredSchedules.map((schedule, index) => (
                            <TypedSchedule
                                key={schedule.schedule.id}
                                typedSchedule={schedule}
                                index={index}
                            />
                        ))}
                    </Accordion>

                    <button
                        onClick={submitSaveSchedule}
                        className={`submit-save-schedule ${submitting ? 'submmitting' : ''}`}
                    >
                        {submitting && (
                            <Spinner
                                animation="border"
                                style={{ width: '1.5rem', height: '1.5rem' }}
                            />
                        )}
                        <span>Lưu lịch học</span>
                        {!submitting && <i className="bi bi-send-fill"></i>}
                    </button>
                </>
            )}

            {smResult && (
                <div className={`submit-schedule-message ${smResult.status}`}>
                    {smResult.status === 'fail' ? (
                        <i className="bi bi-exclamation-triangle-fill"></i>
                    ) : (
                        <i className="bi bi-check-circle-fill"></i>
                    )}
                    <div>{smResult.message}</div>
                </div>
            )}
        </section>
    )
}

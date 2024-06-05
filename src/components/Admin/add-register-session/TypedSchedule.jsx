import moment from 'moment'
import { useMemo, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'
import { useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast'
import { registerSessionService } from '../../../services/RegisterSessionService'
import { HttpRequestErrorHandler } from '../../../utils/httpRequestErrorHandler'

const SectionDivider = ({ title, styling, color }) => {
    return (
        <div className="section-divider" style={styling || {}}>
            <p style={color ? { color } : {}}>{title}</p>
        </div>
    )
}

const SubjectSchedule = ({ schedule, index }) => {
    const { dayOfWeek, numberOfSessions, roomCode, startingSession, teacher, forClass } = schedule

    const beginDate = new Date(schedule.beginDate * 1)
    const endDate = new Date(schedule.endDate * 1)

    return (
        <section className="subject-schedule">
            <SectionDivider title={`Lịch dạy số ${index + 1}`} />

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
                <span>{forClass.code}</span>
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
                <strong>Thời gian học:</strong>
                <span>{`Từ ${beginDate.getDate()}/${beginDate.getMonth() + 1}/${beginDate.getFullYear()}`}</span>
                <span>{` đến ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}.`}</span>
            </div>
        </section>
    )
}

const Schedule = ({ schedule, index }) => {
    const { subjectInfo, schedules, subject } = schedule

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
                    <div className="info-item">
                        <strong>Nhóm:</strong>
                        <span>{subjectInfo.teamGroup}</span>
                    </div>
                    <div className="info-item">
                        <strong>Tổ:</strong>
                        <span>{subjectInfo.partGroup}</span>
                    </div>
                    <div className="info-item">
                        <strong>Số slot:</strong>
                        <span>{subjectInfo.slotsCount}</span>
                    </div>
                </div>

                <div className="typed-schedule-section-schedules">
                    {schedules.map((schedule, index) => (
                        <SubjectSchedule
                            key={
                                schedule.beginDate +
                                schedule.dayOfWeek +
                                schedule.endDate +
                                schedule.numberOfSessions +
                                schedule.roomCode +
                                schedule.startingSession +
                                schedule.teacher.code
                            }
                            schedule={schedule}
                            index={index}
                        />
                    ))}
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export const TypedSchedule = () => {
    const {
        major,
        classesForStudent,
        subjects,
        subjectInfos,
        teachers,
        subjectSchedules,
        registerSessionInfo,
        datasets,
    } = useSelector(({ registerSession }) => registerSession)
    const [submitting, setSubmitting] = useState(false)
    const [smResult, setSmResult] = useState(null)
    const toast = useToast()
    console.log('>>> final schedules >>>', {
        major,
        classesForStudent,
        subjects,
        subjectInfos,
        teachers,
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
            subjectInfos &&
            subjectInfos.length > 0 &&
            teachers &&
            teachers.length > 0 &&
            classesForStudent.pickingClass &&
            subjectSchedules &&
            subjectSchedules.length > 0
        ) {
            const schedules_map = new Map()

            for (const subject of subjects) {
                schedules_map.set(subject.code, { subject })
            }

            for (const subjectInfo of subjectInfos) {
                const { subject, ...subject_info } = subjectInfo
                const subjectCode = subject.code
                const schedule = schedules_map.get(subjectCode)
                schedules_map.set(subjectCode, { ...schedule, subjectInfo: subject_info })
            }

            for (const subjectSchedule of subjectSchedules) {
                const subjectCode = subjectSchedule.subject.code
                const teacher = teachers.find(({ subject }) => subject.code === subjectCode)
                const mapSchedule = schedules_map.get(subjectCode)
                mapSchedule.schedules = subjectSchedule.schedules.map((schedule) => ({
                    ...schedule,
                    teacher: teacher.teachers.find(({ code }) => code === schedule.teacher.code),
                }))
                schedules_map.set(subjectCode, mapSchedule)
            }

            return Array.from(schedules_map.entries())
                .map(([_, schedule]) => schedule)
                .filter(
                    ({ subject, subjectInfo, schedules }) => subject && subjectInfo && schedules
                )
        }

        return null
    }, [
        major,
        subjects,
        subjectInfos,
        classesForStudent,
        teachers,
        subjectSchedules,
        registerSessionInfo,
    ])
    console.log('>>> refactored schedules >>>', refactoredSchedules)

    const submitSaveSchedule = async () => {
        setSubmitting(true)

        const data = {
            registerSessionDTO: {
                regSessCode: registerSessionInfo.regSessCode,
                beginTime: registerSessionInfo.beginTime,
                endTime: registerSessionInfo.endTime,
            },
            scheduledSubjectDTOs: refactoredSchedules,
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
                            <Schedule
                                key={schedule.subject.code}
                                schedule={schedule}
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

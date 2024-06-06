import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useToast } from '../../hooks/toast'
import {
    clearSchedules,
    createSchedulesForNewTerm,
    pickSchedule,
    setFetchRegisterStatus,
    setResultOfNewTerm,
    unPickSchedule,
} from '../../redux/reducers/registerNewTerm'
import { registerSessionService } from '../../services/RegisterSessionService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './RegisterNewTerm.scss'

const RESULT_EVENT_NAME = 'RESULT_EVENT'
const RESULT_IS_EMPTY = 'RESULT_IS_EMPTY'

const ScheduleRow = ({
    schedule,
    dispatch,
    pickedSchedules,
    index,
    groupLength,
    subjectSchedule,
}) => {
    const { subject, partGroup, teamGroup } = schedule
    const {
        beginDate,
        dayOfWeek,
        endDate,
        numberOfSessions,
        roomCode,
        startingSession,
        teacher,
        slotsCount,
        slotsLeft,
        classCode,
    } = subjectSchedule

    const pickScheduleHandler = () => {
        const picked_schedules = schedule.group.map(({ scheduleID }) => ({
            scheduleID,
            subjectID: subject.id,
            partGroup,
            teamGroup,
        }))
        if (checkPickedSubject()) {
            dispatch(unPickSchedule(picked_schedules))
        } else {
            dispatch(pickSchedule(picked_schedules))
        }
    }

    const checkNonPickedSubject = () => {
        return (
            pickedSchedules &&
            pickedSchedules.length > 0 &&
            pickedSchedules.some(
                (pickedSchedule) =>
                    pickedSchedule.subjectID === subject.id &&
                    (pickedSchedule.partGroup !== partGroup ||
                        pickedSchedule.teamGroup !== teamGroup)
            )
        )
    }

    const isNonPickedSubject = checkNonPickedSubject()

    const checkPickedSubject = () => {
        return (
            pickedSchedules &&
            pickedSchedules.length > 0 &&
            pickedSchedules.some(
                (pickedSchedule) =>
                    pickedSchedule.subjectID === subject.id &&
                    pickedSchedule.partGroup === partGroup &&
                    pickedSchedule.teamGroup === teamGroup
            )
        )
    }

    const isPickedSubject = checkPickedSubject()

    return (
        <tr>
            {index === 0 && (
                <>
                    <td
                        onClick={pickScheduleHandler}
                        rowSpan={groupLength}
                        className={`result-table-cell pick-status ${isNonPickedSubject ? 'picked-to-reg' : ''}`}
                    >
                        {isPickedSubject ? (
                            <i className="bi bi-check-square-fill"></i>
                        ) : (
                            <i className="bi bi-app"></i>
                        )}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell subjectCode">
                        {subject.code}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell subjectName">
                        {subject.name}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell teamGroup">
                        {teamGroup}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell partGroup">
                        {partGroup}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell creditsCount">
                        {subject.creditsCount}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell classCode">
                        {classCode}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell slotsCount">
                        {slotsCount}
                    </td>
                    <td rowSpan={groupLength} className="result-table-cell slotsLeft">
                        {slotsLeft}
                    </td>
                </>
            )}
            <td className="result-table-cell dayOfWeek">{dayOfWeek}</td>
            <td className="result-table-cell startingSession">{startingSession}</td>
            <td className="result-table-cell numberOfSessions">{numberOfSessions}</td>
            <td className="result-table-cell roomCode">{roomCode}</td>
            <td className="result-table-cell teacherCode">{teacher.code}</td>
            <td className="result-table-cell learingDate">
                <div className="learingDate-row">
                    <span>{beginDate}</span>
                    <span>đến</span>
                    <span>{endDate}</span>
                </div>
            </td>
        </tr>
    )
}

const fetchRegisterStatuses = {
    nonExist: 'non-exist',
    loading: 'loading',
    canRegister: 'can-register',
}

const groupSchedules = (originalSchedules) => {
    const grouped = {}

    for (const schedule of originalSchedules) {
        const { subject, partGroup, teamGroup, ...scheduleSideInfo } = schedule

        const key = `${subject.code}-${schedule.partGroup}-${schedule.teamGroup}`

        if (!grouped[key]) {
            grouped[key] = {
                subject: subject,
                partGroup: partGroup,
                teamGroup: teamGroup,
                group: [],
            }
        }

        grouped[key].group.push(scheduleSideInfo)
    }

    return Object.values(grouped)
}

// danh sách môn học mở cho đăng ký
const RegisterTable = () => {
    const { schedules, userData, regSessInfo, fetchRegisterStatus } = useSelector(
        ({ registerNewTermSlice }) => registerNewTermSlice
    )
    const dispatch = useDispatch()
    const toast = useToast()
    const [submitting, setSubmitting] = useState(false)

    const groupedSchedules = useMemo(() => {
        if (schedules && schedules.length > 0) {
            return groupSchedules(schedules)
        }
        return null
    }, [schedules])
    console.log('>>> groupedSchedules >>>', groupedSchedules)

    const getRegisterSessionForNewTerm = async () => {
        let apiSuccess = false
        let apiResult
        try {
            const fetched_schedules = await registerSessionService.getRegisterSessionForNewTerm()
            console.log('>>> fetched_schedules >>>', fetched_schedules)
            apiSuccess = true
            apiResult = fetched_schedules
        } catch (error) {
            const err = new HttpRequestErrorHandler(error)
            err.handleAxiosError()
            toast.error(err.message)
        }
        if (apiSuccess) {
            if (apiResult && apiResult.schedules.length > 0) {
                dispatch(createSchedulesForNewTerm(apiResult))
                dispatch(setFetchRegisterStatus(fetchRegisterStatuses.canRegister))
            } else {
                dispatch(setFetchRegisterStatus(fetchRegisterStatuses.nonExist))
            }
        }
    }

    const confirmRegisterNewTerm = async () => {
        const { pickedSchedules } = userData
        console.log('>>> confirm Register New Term >>>', pickedSchedules)
        if (!pickedSchedules || pickedSchedules.length === 0) {
            toast.error('Dữ liệu đăng ký không thể trống')
            return
        }
        setSubmitting(true)
        let apiSuccess = false
        try {
            await registerSessionService.registerNewTerm({
                registerNewTermDTOs: pickedSchedules,
                regSessID: regSessInfo.regSessID,
            })
            apiSuccess = true
        } catch (error) {
            const err = new HttpRequestErrorHandler(error)
            err.handleAxiosError()
            toast.error(err.message)
        }
        if (apiSuccess) {
            toast.success('Đăng ký môn thành công')
            const result_event = new CustomEvent(RESULT_EVENT_NAME, { detail: 'success' })
            document.dispatchEvent(result_event)
        }
        setSubmitting(false)
    }

    useEffect(() => {
        getRegisterSessionForNewTerm()
    }, [])

    return (
        <section className="register-new-term-table-section">
            <div className="section-title-box">
                <h2 className="section-title">Danh sách môn học mở cho đăng ký</h2>
            </div>

            <table className={`register-new-term-table`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Mã MH</th>
                        <th className="subject-name">Tên môn học</th>
                        <th>Nhóm</th>
                        <th>Tổ</th>
                        <th>Số TC</th>
                        <th>Lớp</th>
                        <th>Số lượng</th>
                        <th>Còn lại</th>
                        <th>Thứ</th>
                        <th>Tiết BĐ</th>
                        <th>Số tiết</th>
                        <th>Phòng</th>
                        <th>Giảng viên</th>
                        <th>Thời gian học</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedSchedules &&
                        groupedSchedules.length > 0 &&
                        groupedSchedules.map((schdl) =>
                            schdl.group.map((subjectSchedule, index) => (
                                <ScheduleRow
                                    key={subjectSchedule.scheduleID}
                                    schedule={schdl}
                                    subjectSchedule={subjectSchedule}
                                    dispatch={dispatch}
                                    pickedSchedules={userData.pickedSchedules}
                                    index={index}
                                    groupLength={schdl.group.length}
                                />
                            ))
                        )}
                </tbody>
            </table>

            {fetchRegisterStatus === fetchRegisterStatuses.loading ? (
                <div className="register-new-term-on-progress">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                fetchRegisterStatus === fetchRegisterStatuses.nonExist && (
                    <div className="register-table-message">Chưa có đợt đăng ký môn học nào.</div>
                )
            )}

            {fetchRegisterStatus === fetchRegisterStatuses.canRegister && (
                <div className="confirm-btn-box">
                    <span></span>
                    <button className={`confirm-btn`} onClick={confirmRegisterNewTerm}>
                        {submitting ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <>
                                <span>Xác nhận đăng ký môn</span>
                                <i className="bi bi-send-fill"></i>
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    )
}

const ScheduleRowOfResult = ({ resultSubject, toast, regSessInfo, result }) => {
    const { classCode, registerDate, schedule, subject } = resultSubject
    const [loading, setLoading] = useState(false)

    const cancelRegisterHandler = async () => {
        const filteredSchedules = result.resultSubjects.filter(
            (schdl) =>
                schdl.schedule.partGroup === schedule.partGroup &&
                schdl.schedule.teamGroup === schedule.teamGroup &&
                schdl.subject.code === subject.code
        )
        const scheduleIDs = filteredSchedules.map(({ schedule }) => schedule.id)
        setLoading(true)
        let apiSuccess = false
        console.log('>>> cancel register info >>>', {
            regSessID: regSessInfo.regSessID,
            scheduleIDs,
        })
        try {
            await registerSessionService.studentCancelRegister(regSessInfo.regSessID, scheduleIDs)
            apiSuccess = true
        } catch (error) {
            const err = new HttpRequestErrorHandler(error)
            err.handleAxiosError()
            toast.error(err.message)
        }
        if (apiSuccess) {
            toast.success('Hủy đăng ký môn học thành công')
        }
        setLoading(false)
    }

    return (
        <tr>
            <td
                className={`result-table-cell cancelRegister ${loading ? 'loading' : ''}`}
                onClick={cancelRegisterHandler}
            >
                {loading ? (
                    <div className="spinner-wrapper">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <i className="bi bi-x-lg"></i>
                )}
            </td>
            <td className="result-table-cell subjectCode">{subject.code}</td>
            <td className="result-table-cell subjectName">{subject.name}</td>
            <td className="result-table-cell teamGroup">{schedule.teamGroup}</td>
            <td className="result-table-cell partGroup">{schedule.partGroup}</td>
            <td className="result-table-cell creditsCount">{subject.creditsCount}</td>
            <td className="result-table-cell classCode">{classCode}</td>
            <td className="result-table-cell registerDate">
                {moment(registerDate).format('DD-MM-YYYY HH:mm')}
            </td>
            <td className="result-table-cell scheduleTable">
                <NavLink to={'/student/schedule'}>
                    <i className="bi bi-list-columns-reverse"></i>
                </NavLink>
            </td>
        </tr>
    )
}

function formatNumberWithCommas(number) {
    let numberString = `${number}`
    let formattedString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return formattedString
}

const removeOverlapSubjects = (resultSubjects) => {
    const seen = new Map()
    return resultSubjects.filter(({ subject }) => {
        if (seen.has(subject.code)) {
            return false
        } else {
            seen.set(subject.code, true)
            return true
        }
    })
}

const ResultOfNewTerm = () => {
    const { regSessInfo, result, fetchRegisterStatus } = useSelector(
        ({ registerNewTermSlice }) => registerNewTermSlice
    )
    const toast = useToast()
    const dispatch = useDispatch()

    const resultSubjects = useMemo(() => {
        if (result) {
            const { resultSubjects } = result
            if (resultSubjects && resultSubjects.length > 0) {
                return removeOverlapSubjects(resultSubjects)
            }
        }
        return null
    }, [result])

    const setPickedSchedulesHandler = async () => {
        if (result) {
            const { resultSubjects } = result
            if (resultSubjects && resultSubjects.length > 0) {
                const picked_schedules = resultSubjects.map(({ schedule, subject }) => ({
                    scheduleID: schedule.id,
                    subjectID: subject.id,
                    partGroup: schedule.partGroup,
                    teamGroup: schedule.teamGroup,
                }))
                dispatch(clearSchedules())
                dispatch(pickSchedule(picked_schedules))
            }
        }
    }

    useEffect(() => {
        setPickedSchedulesHandler()
    }, [result])

    const getResultOfNewTerm = async () => {
        if (regSessInfo && regSessInfo.regSessID) {
            let apiSuccess = false
            let apiResult
            try {
                const newTermResult = await registerSessionService.getResultOfNewTerm(
                    regSessInfo.regSessID
                )
                console.log('>>> new term result >>>', newTermResult)
                apiSuccess = true
                apiResult = newTermResult
            } catch (error) {
                const err = new HttpRequestErrorHandler(error)
                err.handleAxiosError()
                toast.error(err.message)
            }
            if (apiSuccess) {
                dispatch(setResultOfNewTerm(apiResult || RESULT_IS_EMPTY))
            }
        }
    }

    const displayTotalPayAmount = (totalPayAmount) => {
        return `${formatNumberWithCommas(totalPayAmount * 1000)} VND.`
    }

    useEffect(() => {
        getResultOfNewTerm()

        document.addEventListener(RESULT_EVENT_NAME, () => {
            getResultOfNewTerm()
        })

        return () => {
            document.removeEventListener(RESULT_EVENT_NAME, () => {})
        }
    }, [regSessInfo])

    return (
        fetchRegisterStatus &&
        fetchRegisterStatus !== fetchRegisterStatuses.nonExist && (
            <section className="result-new-term-table-section">
                <div className="section-title-box">
                    <h2 className="section-title">Danh sách môn học đã đăng ký:</h2>
                    {result && result.totalCredits && result.totalSubjects && (
                        <h2 className="result-text-summary">
                            <strong>{result.totalSubjects + ' môn'}</strong>
                            <span>,</span>
                            <strong>{result.totalCredits + ' tín chỉ'}</strong>
                        </h2>
                    )}
                </div>

                <table className="register-new-term-table">
                    <thead>
                        <tr>
                            <th>Hủy ĐK</th>
                            <th>Mã MH</th>
                            <th className="subject-name">Tên môn học</th>
                            <th>Nhóm</th>
                            <th>Tổ</th>
                            <th>Số TC</th>
                            <th>Lớp</th>
                            <th>Ngày đăng ký</th>
                            <th>Thời khóa biểu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultSubjects &&
                            resultSubjects.length > 0 &&
                            resultSubjects.map((resultSubject) => (
                                <ScheduleRowOfResult
                                    key={resultSubject.subject.code}
                                    resultSubject={resultSubject}
                                    toast={toast}
                                    regSessInfo={regSessInfo}
                                    result={result}
                                />
                            ))}
                    </tbody>
                </table>
                {result === null ? (
                    <div className="register-new-term-on-progress">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    result === RESULT_IS_EMPTY && (
                        <div className="register-table-message">
                            Bạn chưa đăng ký bất cứ môn học nào.
                        </div>
                    )
                )}

                {result && result.totalPayAmount && (
                    <div className="total-pay-amount">
                        <div className="pay-amount-text">
                            <span>Học phí tổng cộng:</span>
                            <strong>{displayTotalPayAmount(result.totalPayAmount)}</strong>
                        </div>
                    </div>
                )}
            </section>
        )
    )
}

export const RegisterNewTerm = () => {
    return (
        <section id="RegisterNewTerm">
            <RegisterTable />
            <ResultOfNewTerm />
        </section>
    )
}

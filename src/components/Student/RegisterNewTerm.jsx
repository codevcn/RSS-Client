import moment from 'moment'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../hooks/toast'
import {
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

const ScheduleRow = ({ schedule, dispatch, pickedSchedules }) => {
    const {
        beginDate,
        classCode,
        dayOfWeek,
        endDate,
        numberOfSessions,
        partGroup,
        roomCode,
        startingSession,
        subject,
        teacher,
        teamGroup,
        scheduleID,
    } = schedule

    const checkPicked = () => {
        return (
            pickedSchedules &&
            pickedSchedules.length > 0 &&
            pickedSchedules.some((preShedule) => preShedule.scheduleID === scheduleID)
        )
    }

    const pickScheduleHandler = () => {
        if (checkPicked(scheduleID)) {
            dispatch(unPickSchedule({ scheduleID }))
        } else {
            dispatch(pickSchedule({ scheduleID, subjectID: subject.id }))
        }
    }

    const isPickedRow = checkPicked()

    return (
        <tr onClick={pickScheduleHandler} className={isPickedRow ? 'is-picked-row' : ''}>
            <td className="result-table-cell pick-status">
                {isPickedRow ? (
                    <i className="bi bi-check-square-fill"></i>
                ) : (
                    <i className="bi bi-app"></i>
                )}
            </td>
            <td className="result-table-cell subjectCode">{subject.code}</td>
            <td className="result-table-cell subjectName">{subject.name}</td>
            <td className="result-table-cell teamGroup">{teamGroup}</td>
            <td className="result-table-cell partGroup">{partGroup}</td>
            <td className="result-table-cell creditsCount">{subject.creditsCount}</td>
            <td className="result-table-cell classCode">{classCode}</td>
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
    empty: 'empty',
    loading: 'loading',
    success: 'success',
}

const RegisterTable = () => {
    const { schedules, userData, regSessInfo, result, fetchRegisterStatus } = useSelector(
        ({ registerNewTermSlice }) => registerNewTermSlice
    )
    const dispatch = useDispatch()
    const toast = useToast()
    const [submitting, setSubmitting] = useState(false)

    const getRegisterSessionForNewTerm = async () => {
        let apiSuccess = false
        let apiResult
        dispatch(setFetchRegisterStatus(fetchRegisterStatuses.loading))
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
            if (apiResult && apiResult.length > 0) {
                dispatch(createSchedulesForNewTerm(apiResult))
                dispatch(setFetchRegisterStatus(fetchRegisterStatuses.success))
            } else {
                dispatch(setFetchRegisterStatus(fetchRegisterStatuses.empty))
            }
        }
    }

    const confirmRegisterNewTerm = async () => {
        const { pickedSchedules } = userData
        console.log('>>> pickedSchedules >>>', pickedSchedules)
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

    const checkResultIsEmpty = () => result && result === RESULT_IS_EMPTY

    return (
        <section className="register-new-term-table-section">
            <div className="section-title-box">
                <h2 className="section-title">Danh sách môn học mở cho đăng ký</h2>
                {result && result !== RESULT_IS_EMPTY && result.length > 0 && (
                    <h2 className="registered">(Sinh viên đã đăng ký)</h2>
                )}
            </div>

            <table className={`register-new-term-table ${checkResultIsEmpty() ? '' : 'inactive'}`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Mã MH</th>
                        <th className="subject-name">Tên môn học</th>
                        <th>Nhóm</th>
                        <th>Tổ</th>
                        <th>Số TC</th>
                        <th>Lớp</th>
                        <th>Thứ</th>
                        <th>Tiết bắt đầu</th>
                        <th>Số tiết</th>
                        <th>Phòng</th>
                        <th>Giảng viên</th>
                        <th>Thời gian học</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules &&
                        schedules.length > 0 &&
                        schedules.map((schedule) => (
                            <ScheduleRow
                                key={schedule.scheduleID}
                                schedule={schedule}
                                dispatch={dispatch}
                                pickedSchedules={userData.pickedSchedules}
                            />
                        ))}
                </tbody>
            </table>
            {fetchRegisterStatus && fetchRegisterStatus === fetchRegisterStatuses.loading ? (
                <div className="register-new-term-on-progress">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                fetchRegisterStatus === fetchRegisterStatuses.empty && (
                    <div className="register-table-message">Chưa có đợt đăng ký môn học nào.</div>
                )
            )}
            {fetchRegisterStatus && fetchRegisterStatus === fetchRegisterStatuses.success && (
                <div className="confirm-btn-box">
                    <span></span>
                    <button
                        className={`confirm-btn ${checkResultIsEmpty() ? '' : 'inactive'}`}
                        onClick={confirmRegisterNewTerm}
                    >
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

const ScheduleRowOfResult = ({ resultSubject }) => {
    const { classCode, registerDate, schedule, subject } = resultSubject

    return (
        <tr>
            <td className="result-table-cell cancelRegister">
                <i className="bi bi-x-lg"></i>
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
                <i className="bi bi-list-columns-reverse"></i>
            </td>
        </tr>
    )
}

function formatNumberWithCommas(number) {
    let numberString = `${number}`
    let formattedString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return formattedString
}

const ResultOfNewTerm = () => {
    const { regSessInfo, result, fetchRegisterStatus } = useSelector(
        ({ registerNewTermSlice }) => registerNewTermSlice
    )
    const toast = useToast()
    const resultSubjects = result && result.resultSubjects
    const dispatch = useDispatch()

    const setPickedSchedulesHandler = () => {
        if (result) {
            const { resultSubjects } = result
            if (resultSubjects && resultSubjects.length > 0) {
                for (const resultSubject of resultSubjects) {
                    dispatch(
                        pickSchedule({
                            scheduleID: resultSubject.schedule.id,
                            subjectID: resultSubject.subject.id,
                        })
                    )
                }
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
        fetchRegisterStatus !== fetchRegisterStatuses.empty && (
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

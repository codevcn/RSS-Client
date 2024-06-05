import { useRef, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast'
import { registerSessionService } from '../../../services/RegisterSessionService'
import { HttpRequestErrorHandler } from '../../../utils/httpRequestErrorHandler'
import './FinalResult.scss'

const SearchRegisterSession = () => {
    const [searching, setSearching] = useState(false)
    const inputRef = useRef()
    const toast = useToast()
    const [message, setMessage] = useState(null)

    const validateInput = (inputValue) => {
        let isValid = true
        if (!inputValue) {
            isValid = false
            setMessage('Vui lòng không bỏ trống trường tìm kiếm')
        } else {
            setMessage(null)
        }
        return isValid
    }

    const searchRegisterSessionHandler = async () => {
        const regSessCode = inputRef.current.value
        if (validateInput(regSessCode)) {
            setSearching(true)
            let apiSuccess = false
            try {
                const registerSession =
                    await registerSessionService.searchRegisterSession(regSessCode)
                console.log('>>> data of search reg sess >>>', registerSession)
                apiSuccess = true
            } catch (error) {
                const err = new HttpRequestErrorHandler(error)
                err.handleAxiosError()
                toast.error(err.message)
            }
            setSearching(false)
        }
    }

    const catchEnter = (e) => {
        if (e.key === 'Enter') {
            searchRegisterSessionHandler()
        }
    }

    return (
        <div className="search-register-session">
            <div className="form-group">
                <label>Tìm đợt đăng ký</label>
                <div className="input-container">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Nhập mã đợt đăng kí..."
                        onKeyUp={catchEnter}
                    />
                    <button onClick={searchRegisterSessionHandler}>
                        {searching ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <>
                                <span>Tìm kiếm</span>
                            </>
                        )}
                    </button>
                </div>
                {message && <div className="message">{message}</div>}
            </div>
        </div>
    )
}

const ScheduleTable = ({ finalResult }) => {
    return (
        <table className="result-table">
            <thead>
                <tr>
                    <th>Mã môn học</th>
                    <th>Tên môn học</th>
                    <th>Nhóm tổ</th>
                    <th>Số tín chỉ</th>
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
                {finalResult &&
                    finalResult.length > 0 &&
                    finalResult.map(
                        ({
                            subjectCode,
                            subjectName,
                            groupName,
                            numberOfCredits,
                            className,
                            dayOfWeek,
                            startingSession,
                            numberOfSessions,
                            room,
                            teacher,
                            beginDate,
                            endDate,
                        }) => (
                            <tr key={subjectCode}>
                                <td className="result-table-cell subjectCode">{subjectCode}</td>
                                <td className="result-table-cell subjectName">{subjectName}</td>
                                <td className="result-table-cell groupName">{groupName}</td>
                                <td className="result-table-cell numberOfCredits">
                                    {numberOfCredits}
                                </td>
                                <td className="result-table-cell className">{className}</td>
                                <td className="result-table-cell dayOfWeek">{dayOfWeek}</td>
                                <td className="result-table-cell startingSession">
                                    {startingSession}
                                </td>
                                <td className="result-table-cell numberOfSessions">
                                    {numberOfSessions}
                                </td>
                                <td className="result-table-cell room">{room}</td>
                                <td className="result-table-cell teacher">{teacher}</td>
                                <td className="result-table-cell date">
                                    <div className="date-row">
                                        <span>{beginDate}</span>
                                        <span>đến</span>
                                        <span>{endDate}</span>
                                    </div>
                                </td>
                            </tr>
                        )
                    )}
            </tbody>
        </table>
    )
}

export const FinalResult = () => {
    const finalResult = useSelector(({ registerSession }) => registerSession.finalResult)

    return (
        <div className="add-register-session-section final-result">
            <div className="add-register-session-section-title">
                <h2>Lịch học dự kiến</h2>
            </div>

            <SearchRegisterSession />

            <div className="result-table-container">
                {finalResult && (
                    <>
                        <div className="noticing-text">Lịch học dự kiến cho các môn:</div>
                        <ScheduleTable finalResult={finalResult} />
                    </>
                )}
            </div>
        </div>
    )
}

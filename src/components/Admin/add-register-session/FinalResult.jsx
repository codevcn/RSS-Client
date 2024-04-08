import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const FinalResult = () => {
    const { major, schedules } = useSelector(({ registerSession }) => registerSession.data)
    console.log('>>> schedules >>>', schedules)
    const table_data = useMemo(() => {
        if (major && schedules && schedules.length > 0) {
            const schedules_map = new Map()

            for (const schedule of schedules) {
                // const subject_code=schedule.
                // schedules_map.set(schedule.code,{...schedules_map.get(sc)})
            }

            return Array.from(schedules_map.entries())
        }

        return null
    }, [schedules])

    return (
        <div className="final-result">
            <h2 className="final-result-title">
                <i className="bi bi-chevron-double-right"></i>
                <span>Xác nhận lịch học</span>
                <i className="bi bi-chevron-double-left"></i>
            </h2>

            <div className="result-table-container">
                <div className="noticing-text">Lịch học dự kiến cho các môn:</div>
                {table_data ? (
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
                            {table_data.map(
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
                                        <td className="result-table-cell subjectCode">
                                            {subjectCode}
                                        </td>
                                        <td className="result-table-cell subjectName">
                                            {subjectName}
                                        </td>
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
                ) : (
                    <div className="result-warning">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <span>Vui lòng hoàn thành tất cả các thông tin cần thiết!</span>
                    </div>
                )}
            </div>
        </div>
    )
}

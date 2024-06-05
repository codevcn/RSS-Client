import { useNavigate } from 'react-router-dom'
import notifications from '../lib/notifications'
import './StudentHome.scss'

const StudentHome = () => {
    const navigator = useNavigate()

    const subjectList = () => {
        navigator('/student/subject')
    }
    const courseRegistration = () => {
        navigator('/student/course-registration')
    }
    const navToRegisterSessionNewTerm = () => {
        navigator('/student/register-session')
    }

    return (
        <div className="HomePage">
            {/* <div className="AddRegisterSession-title">
                <h2>Trang chủ Sinh viên</h2>
            </div> */}
            <div className="button-div">
                <button className="Sub" onClick={subjectList}>
                    Thông tin môn học
                </button>
                <button className="Reg" onClick={courseRegistration}>
                    Môn học đã đăng ký
                </button>
                <button className="Reg" onClick={navToRegisterSessionNewTerm}>
                    Đăng ký môn học
                </button>
            </div>
            <Notification />
        </div>
    )
}
const Notification = () => {
    return (
        <div className="notifications">
            {notifications.map(({ id, title, date }) => (
                <div key={id} className="notification">
                    <div className="notification-title-box">
                        <span>
                            <i className="bi bi-chevron-double-right"></i>
                        </span>
                        <span>
                            <span>{title}</span>
                            <i className="bi bi-bell-fill"></i>
                        </span>
                    </div>
                    <div className="date">
                        <span>{date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StudentHome

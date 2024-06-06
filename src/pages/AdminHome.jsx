import { useNavigate } from 'react-router-dom'
import notifications from '../lib/notifications'
import './AdminHome.scss'
import HomePage from './Home'
const AdminHome = () => {
    const navigator = useNavigate()
    const Admin = () => {
        navigator('/admin/info')
    }
    const subjectList = () => {
        navigator('/admin/subject')
    }
    const StudentList = () => {
        navigator('/admin/student/infor')
    }
    const ChangeCourse = () => {
        navigator('/admin/change-course-registration')
    }
    const navToAddRegisterSession = () => {
        navigator('/admin/add-register-session')
    }
    return (
        <div className="HomePage">
            {/* <div className="AddRegisterSession-title">
                <h2>Admin Home</h2>
            </div> */}
            <div className="button-div">
                <button className="Stu" onClick={StudentList}>
                    Quản lý sinh viên
                </button>
                <button className="Sub" onClick={subjectList}>
                    Quản lý môn học
                </button>
                <button className="Info" onClick={ChangeCourse}>
                    Điều chỉnh đăng kí môn
                </button>
                <button className="Info" onClick={Admin}>
                    Thông tin người quản lý
                </button>
                <button className="add-register-session" onClick={navToAddRegisterSession}>
                    Mở đợt đăng ký môn học
                </button>
            </div>
            <div>
                <HomePage />
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

export default AdminHome

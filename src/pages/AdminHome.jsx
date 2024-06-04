import { useNavigate } from 'react-router-dom'
import notifications from '../lib/notifications'
import './AdminHome.scss'
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
    return (
        <div className="HomePage">
            {/* <div className="AddRegisterSession-title">
                <h2>Trang chủ</h2>
            </div> */}
            <div className="button-div">
                <button className="Stu" onClick={StudentList}>
                    Danh sách sinh viên
                </button>
                <button className="Sub" onClick={subjectList}>
                    Danh sách môn học
                </button>
                <button className="Info" onClick={ChangeCourse}>
                    Điều chỉnh đăng ký môn
                </button>
                <button className="Info" onClick={Admin}>
                    Thông tin tài khoản
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

export default AdminHome

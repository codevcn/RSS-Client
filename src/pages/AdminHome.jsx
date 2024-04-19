import { useNavigate } from 'react-router-dom'
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
            <div className="AddRegisterSession-title">
                <h2>Admin Home</h2>
            </div>
            <div className="button-div">
                <button className="Sub" onClick={subjectList}>
                    subjectList
                </button>
                <button className="Stu" onClick={StudentList}>
                    StudentList
                </button>
                <button className="Info" onClick={Admin}>
                    AdminInfo
                </button>
                <button className="Info" onClick={ChangeCourse}>
                    Điều chỉnh đăng kí môn
                </button>
            </div>
        </div>
    )
}

export default AdminHome

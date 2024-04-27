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
    const navToAddRegisterSession = () => {
        navigator('/admin/add-register-session')
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
                <button className="add-register-session" onClick={navToAddRegisterSession}>
                    Mở đợt đăng ký môn học
                </button>
            </div>
        </div>
    )
}

export default AdminHome

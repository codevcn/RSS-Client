import { useNavigate } from 'react-router-dom'
import AdminInfo from './../components/Admin/AdminInfo'
import HomePage from './Home'
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
    const searchStu = () => {
        navigator('/admin/search-student')
    }
    return (
        <div className="HomePage">
            <div className="AddRegisterSession-title">  
                <h2>Admin Home</h2>
            </div>
            <div className='button-div'>
                <button className="Sub" onClick={subjectList}>
                    subjectList
                </button>
                <button className="Stu" onClick={StudentList}>
                    StudentList
                </button>
                <button className="Info" onClick={Admin}>
                    AdminInfo
                </button>
                <button className="search-Stu" onClick={searchStu}>
                    SearchStudent
                </button>
            </div>
            <div>
                <HomePage />
            </div>
        </div>
    )
}

export default AdminHome

import { useNavigate } from 'react-router-dom'
import './AdminHome.scss'
const AdminHome = () => {
    const navigator = useNavigate()
    const AdminInfo = () => {
        navigator('/admin/info')
    }
    const subjectList = () => {
        navigator('/admin/subject')
    }
    return (
        <div className="HomePage">
            <div className="AddRegisterSession-title">
                <h2>Admin Home</h2>
                <button className="Info btn btn-secondary" onClick={AdminInfo}>AdminInfo</button>
                <button className="Sub btn btn-secondary" onClick={subjectList}>subjectList</button>
            </div>
        </div>
    )
}

export default AdminHome

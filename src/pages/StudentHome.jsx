import { useNavigate } from 'react-router-dom'
import './StudentHome.scss'

const StudentHome = () => {
    const navigator = useNavigate()

    const subjectList = () => {
        navigator('/student/subject')
    }
    const courseRegistration = () => {
        navigator('/student/course-registration')
    }

    return (
        <div className="HomePage">
            <div className="AddRegisterSession-title">
                <h2>Trang chủ Sinh viên</h2>
            </div>
            <div className="button-div">
                <button className="Sub" onClick={subjectList}>
                    Danh sách môn học
                </button>
                <button className="Reg" onClick={courseRegistration}>
                    Môn học đã đăng ký
                </button>
            </div>
        </div>
    )
}

export default StudentHome

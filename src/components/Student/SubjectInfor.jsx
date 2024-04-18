import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/AdminService'
//import './SubjectInfor.scss'

const SubjectInfor = () => {
    const [subjects, setSubjects] = useState([])
    const navigator = useNavigate()
    useEffect(() => {
        loadSubjects()
    }, [])

    const loadSubjects = () => {
        adminService
            .getAllSubjectInfo()
            .then((response) => {
                setSubjects(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleReturnButtonClick = () => {
        navigator(-1)
    }

    return (
        <div className="SubjectList">
            <div className="AddRegisterSession-title">
                <h2>Thông tin môn học</h2>
            </div>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Mã Môn Học</th>
                        <th>Tên Môn Học</th>
                        <th>Số Tín Chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id} className="hover-row">
                            <td>{subject.subjectCode}</td>
                            <td>{subject.name}</td>
                            <td>{subject.creditCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SubjectInfor

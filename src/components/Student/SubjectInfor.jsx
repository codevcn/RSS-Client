import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/AdminService'
import { studentService } from '../../services/StudentService'
//import './SubjectInfor.scss'

const SubjectInfor = () => {
    const [subjects, setSubjects] = useState([])

    const [student, setStudent] = useState([])

    const [currentUser, setCurrentUser] = useState(null)

    const navigator = useNavigate()

    useEffect(() => {
        loadSubjects()
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('currentUser')
            const userObj = JSON.parse(storedUser)
            setCurrentUser(userObj)
            studentService
                .findStudentByUserName(userObj.username)
                .then((response) => {
                    setStudent(response.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchUserData()
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
                    {subjects.map((subject) => {
                        if (
                            subject &&
                            subject.major &&
                            student &&
                            student.major &&
                            subject.major.id === student.major.id
                        ) {
                            return (
                                <tr key={subject.id} className="hover-row">
                                    <td>{subject.subjectCode}</td>
                                    <td>{subject.name}</td>
                                    <td>{subject.creditCount}</td>
                                </tr>
                            )
                        } else {
                            return null
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SubjectInfor

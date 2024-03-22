import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './SubjectList.scss'
const SubjectList = () => {
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

    const addSubject = () => {
        navigator('/admin/subject/create')
    }

    const updateSubject = (id) => {
        navigator(`/admin/subject/update/${id}`)
    }

    const hideSubject = (id) => {
        adminService
            .hideSubject(id)
            .then(() => {
                toast.success('Cập nhật thành công')
                loadSubjects() // Reload subjects after hiding
            })
            .catch((error) => {
                const errorHandler = new HttpRequestErrorHandler(error)
                errorHandler.handleAxiosError()
                toast.error(errorHandler.message)
            })
    }

    return (
        <div className="SubjectList">
            <h2 className="text-center">Quản lý thông tin môn học</h2>

            <button className="add-button" onClick={addSubject}>
                + Thêm Môn Học
            </button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Tên Môn học</th>
                        <th>Nghành</th>
                        <th>Số tín chỉ</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.name}</td>
                            <td>{subject.major.majorName}</td>
                            <td>{subject.creditCount}</td>
                            <td>
                                <Button
                                    className="edit-button"
                                    onClick={() => updateSubject(subject.id)}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    className="hidden-button"
                                    onClick={() => hideSubject(subject.id)}
                                >
                                    Ẩn
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SubjectList

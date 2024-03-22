import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { studentService } from '../../services/studentService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './UpdateStudent.scss'

const UpdateStudentSection = () => {
    const [student, setStudent] = useState({
        id: '',
        fullName: '',
        gender: '',
        birthday: '',
        phone: '',
        major: '',
    })
    const [majors, setMajors] = useState([]) // Danh sách các major
    const [selectedMajor, setSelectedMajor] = useState('')
    const { id } = useParams()
    const navigator = useNavigate()
    useEffect(() => {
        studentService
            .getStudent(id)
            .then((response) => {
                setStudent(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const confirmed = window.confirm('Bạn có muốn xác nhận thay đổi?')
        if (confirmed) {
            studentService
                .updateStudentInfo(id, student)
                .then(() => {
                    toast.success('Cập nhật thành công')
                    navigator('/student/infor')
                })
                .catch((error) => {
                    const errorHanlder = new HttpRequestErrorHandler(error)
                    errorHanlder.handleAxiosError()
                    toast.error(errorHanlder.message)
                    alert('Cập nhật thất bại')
                })
        }
    }

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const majorsData = await studentService.getAllMajors()
                setMajors(majorsData)
            } catch (error) {
                console.error('Error fetching majors:', error)
            }
        }
        fetchMajors()
    }, [])

    return (
        <div className="UpdateStudentSection">
            <h2>Sửa thông tin sinh viên</h2>

            <form className="update-form">
                <div className="form-group">
                    <label htmlFor="student-id">Mã sinh viên:</label>
                    <input
                        type="text"
                        id="student-id"
                        defaultValue={student.id}
                        //disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="full-name">Họ và tên:</label>
                    <input type="text" id="full-name" defaultValue={student.fullName} />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Giới tính:</label>
                    <select
                        id="gender"
                        value={student.gender}
                        onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Ngày sinh:</label>
                    <input type="text" id="birthday" defaultValue={student.birthday} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input type="text" id="phone" defaultValue={student.phone} />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Mã ngành:</label>
                    {/* <input
                        type="text"
                        id="major"
                        defaultValue={student.major}
                    /> */}
                    <select
                        id="major"
                        value={student.major}
                        onChange={(e) => setStudent({ ...student, major: e.target.value })}
                    >
                        <option value="">-- Chọn ngành --</option>
                        {majors.map((major) => (
                            <option key={major.id} value={major.id}>
                                {major.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Cập nhật
                </button>
            </form>
        </div>
    )
}

export default UpdateStudentSection

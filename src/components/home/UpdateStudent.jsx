import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import './UpdateStudent.scss'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { forwardRef } from 'react'
import { authService } from '../../services/AuthService'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
//import { getStudentInfo, studentService } from '../../services/StudentService'
//import { getStudent } from '../../services/StudentService'
import { studentService } from '../../services/StudentService'

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
                    navigator('/student-infor')
                })
                .catch((error) => {
                    const errorHanlder = new HttpRequestErrorHandler(error)
                    errorHanlder.handleAxiosError()
                    toast.error(errorHanlder.message)
                    alert('Cập nhật thất bại')
                })
        }
    }

    return (
        <div>
            <h2>Sửa thông tin sinh viên</h2>

            <form className="update-form">
                <div className="form-group">
                    <label htmlFor="student-id">Mã sinh viên:</label>
                    <input
                        type="text"
                        id="student-id"
                        defaultValue={student.id}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="full-name">Họ và tên:</label>
                    <input
                        type="text"
                        id="full-name"
                        defaultValue={student.fullName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Giới tính:</label>
                    <input
                        type="text"
                        id="gender"
                        defaultValue={student.gender}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Ngày sinh:</label>
                    <input
                        type="text"
                        id="birthday"
                        defaultValue={student.birthday}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="text"
                        id="phone"
                        defaultValue={student.phone}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Mã ngành:</label>
                    <input
                        type="text"
                        id="major"
                        defaultValue={student.major}
                    />
                    {/* <select id="major" value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
                        {majors.map(major => (
                            <option key={major.id} value={major.id}>{major.name}</option>
                        ))}
                    </select> */}
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Cập nhật
                </button>
            </form>
        </div>
    )
}

export default UpdateStudentSection

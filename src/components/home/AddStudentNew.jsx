import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import './StudentManagement.scss'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { forwardRef } from 'react'
import { authService } from '../../services/AuthService'
import { HttpRequestErrorHandler } from '../../utils/HttpRequestErrorHandler'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { studentService } from '../../services/StudentService'

const StudentSection = () => {
    const [student, setStudent] = useState([])

    const navigator = useNavigate()

    useEffect(() => {
        studentService
            .getStudentInfo()
            .then((response) => {
                setStudent(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    function addNewStudent() {
        navigator('/add-student')
    }

    return (
        <div>
            <h2>Thêm thông tin sinh viên</h2>

            {/* <button className="add-button" onClick={addNewStudent}>+ Thêm sinh viên</button>

            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Số điện thoại</th>
                        <th>Mã ngành</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.fullName}</td>
                            <td>{student.gender}</td>
                            <td>{student.birthday}</td>
                            <td>{student.phone}</td>
                            <td>{student.major}</td>
                            <td>
                                <Button className="edit-button">Chỉnh sửa</Button>{' '}
                                <Button className="hidden-button">Ẩn</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}

export default StudentSection

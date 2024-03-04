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
import { listStudent } from '../../services/StudentService'

const StudentSection = () => {
    const [student, setStudent] = useState([])

    useEffect(() => {
        listStudent()
            .then((response) => {
                setStudent(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    // const dummyData = [
    //     {
    //         "id": "N21DCCN020",
    //         "fullName": "Nguyễn Văn Dũng",
    //         "gender": "Nam",
    //         "birthday": "06-10-2003",
    //         "phone": "0987654321",
    //         "majorID": "CNTT",
    //         "action": "",
    //     },
    //     {
    //         "id": "N21DCCN008",
    //         "fullName": "Nguyễn Thị B",
    //         "gender": "Nữ",
    //         "birthday": "02-13-2004",
    //         "phone": "09876512345",
    //         "majorID": "ATTT",
    //         "action": "",
    //     },
    //     {
    //         "id": "N21DCCN123",
    //         "fullName": "Trần Thị C",
    //         "gender": "Nữ",
    //         "birthday": "12-08-2004",
    //         "phone": "0912354321",
    //         "majorID": "ĐPT",
    //         "action": "",
    //     }
    // ]

    return (
        <div>
            <h2>Quản lý thông tin sinh viên</h2>

            <button class="add-button">+ Thêm sinh viên</button>

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
                            <td>{student.majorID}</td>
                            <td>{student.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentSection

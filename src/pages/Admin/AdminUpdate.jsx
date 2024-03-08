import React, { useEffect, useState } from 'react'
import './AdminUpdate.scss'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { forwardRef } from 'react'
import { adminService } from '../../services/AdminService'
import { useNavigate, useParams } from 'react-router-dom'
import { updateAdmin_api } from '../../apis/Admin'
import toast from 'react-hot-toast'
import { HttpRequestErrorHandler } from '../../utils/HttpRequestErrorHandler'
const AdminUpdate = () => {
    const [adminInfo, setAdminInfo] = useState({
        accountUsername: '',
        idcard: '',
        fullName: '',
        birthday: '',
        gender: '',
        role: '',
    })

    const navigator = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        adminService
            .getAdminInfo(id)
            .then((response) => {
                setAdminInfo(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setAdminInfo((prevAdminInfo) => ({
            ...prevAdminInfo,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        adminService
            .updateAdminInfo(adminInfo.id, adminInfo)
            .then(() => {
                toast.success('Cập nhật thành công')
                navigator('/admin')
            })
            .catch((error) => {
                const errorHanlder = new HttpRequestErrorHandler(error)
                errorHanlder.handleAxiosError()
                toast.error(errorHanlder.message)
            })
    }

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h2>Thông tin cá nhân</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="accountUsername">Tên tài khoản:</label>
                        <input
                            type="text"
                            id="accountUsername"
                            name="accountUsername"
                            value={adminInfo.accountUsername}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="idcard">IDcard:</label>
                        <input
                            type="text"
                            id="idcard"
                            name="idcard"
                            value={adminInfo.idcard}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fullName">Tên:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={adminInfo.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="birthday">Ngày sinh:</label>
                        <input
                            type="text"
                            id="birthday"
                            name="birthday"
                            value={adminInfo.birthday}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={adminInfo.gender}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Chức vụ:</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={adminInfo.role}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="Save-button">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminUpdate

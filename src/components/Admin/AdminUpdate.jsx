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
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
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
                navigator('/admin/info')
            })
            .catch((error) => {
                const errorHanlder = new HttpRequestErrorHandler(error)
                errorHanlder.handleAxiosError()
                toast.error(errorHanlder.message)
            })
    }

    return (
        <div className="SubjectUpdate">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="text-center">Thông tin cá nhân</h2>
                        <div className="card-body"></div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label
                                    className="form-label"
                                    htmlFor="accountUsername"
                                >
                                    Tên tài khoản:
                                </label>
                                <input
                                    type="text"
                                    id="accountUsername"
                                    name="accountUsername"
                                    value={adminInfo.accountUsername}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="idcard">
                                    IDcard:
                                </label>
                                <input
                                    type="text"
                                    id="idcard"
                                    name="idcard"
                                    value={adminInfo.idcard}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label
                                    className="form-label"
                                    htmlFor="fullName"
                                >
                                    Tên:
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={adminInfo.fullName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label
                                    className="form-label"
                                    htmlFor="birthday"
                                >
                                    Ngày sinh:
                                </label>
                                <input
                                    type="text"
                                    id="birthday"
                                    name="birthday"
                                    value={adminInfo.birthday}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="gender">Giới tính:</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={adminInfo.gender}
                                    onChange={handleInputChange}
                                    className="form-control"
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label" htmlFor="role">
                                    Chức vụ:
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={adminInfo.role}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <button
                                type="submit"
                                className="Save-button btn btn-primary"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUpdate

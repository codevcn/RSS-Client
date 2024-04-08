import { useEffect, useState } from 'react'
import { adminService } from '../../services/AdminService'
import AdminUpdate from '../Admin/AdminUpdate'
import ChangePass from '../Admin/ChangePass'
import './AdminInfo.scss'
const AdminInfo = () => {
    const [adminInfo, setAdminInfo] = useState({
        account: {},
        idcard: '',
        fullName: '',
        birthday: '',
        gender: '',
    })
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showPassForm, setshowPassForm] = useState(false)

    useEffect(() => {
        adminService
            .getAdminInfo()
            .then((response) => {
                setAdminInfo(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    function showUpdateModal() {
        setShowUpdateForm(true)
    }

    function showPassModal() {
        setshowPassForm(true)
    }

    const handleReturnButtonClick = () => {
        window.history.back()
    }
    return (
        <div className="AdminInfoContainer">
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Return
                </button>
            </div>
            <div className="AdminInfo">
                {adminInfo && (
                    <div>
                        <h2>Admin Information</h2>
                        <p>
                            Username: <span>{adminInfo.account?.username}</span>
                        </p>
                        <p>
                            idcard: <span>{adminInfo.idcard}</span>
                        </p>
                        <p>
                            fullName: <span>{adminInfo.fullName}</span>
                        </p>
                        <p>
                            birthday: <span>{adminInfo.birthday}</span>
                        </p>
                        <p>
                            gender: <span>{adminInfo.gender}</span>
                        </p>
                    </div>
                )}
                <div>
                    <button className="update" onClick={() => showUpdateModal(adminInfo)}>
                        Chỉnh Sửa Thông Tin Cá Nhân
                    </button>
                    <button className="pass" onClick={() => showPassModal(adminInfo.account?.id)}>
                        Thay Đổi Mật Khẩu Tài Khoản
                    </button>
                    {showUpdateForm && (
                        <AdminUpdate
                            adminInfo={adminInfo}
                            show={showUpdateForm}
                            onHide={() => setShowUpdateForm(false)}
                        />
                    )}
                    {showPassForm && (
                        <ChangePass
                            id={adminInfo.account?.id}
                            show={showPassForm}
                            onHide={() => setshowPassForm(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
export default AdminInfo

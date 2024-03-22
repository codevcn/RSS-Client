// import AdminUpdate from './Admin/AdminUpdate'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/adminService'
import './AdminInfo.scss'
const AdminInfo = () => {
    const [adminInfo, setAdminInfo] = useState({
        accountUsername: '',
        idcard: '',
        fullName: '',
        birthday: '',
        gender: '',
        role: '',
    })
    const navigator = useNavigate()
    useEffect(() => {
        adminService
            .getAdminInfo()
            .then((response) => {
                setAdminInfo(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    // const[Username, setUsername] = useState('')
    // const[idcard, setidcard] = useState('')
    // const[fullName, setfullName] = useState('')
    // const[birthday, setbirthday] = useState('')
    // const[gender, setgender] = useState('')
    // const[role, setrole] = useState('')

    // useState
    // }
    function UpdateAdmin() {
        navigator('/admin/update')
    }

    return (
        <div className="AdminInfo">
            {adminInfo && (
                <div>
                    <h2>Admin Information</h2>
                    <p>Username: {adminInfo.accountUsername}</p>
                    <p>idcard: {adminInfo.idcard}</p>
                    <p>fullName: {adminInfo.fullName}</p>
                    <p>birthday: {adminInfo.birthday}</p>
                    <p>gender: {adminInfo.gender}</p>
                    <p>role: {adminInfo.role}</p>
                </div>
            )}
            <div>
                <button onClick={UpdateAdmin}>Chỉnh Sửa Thông Tin cá Nhân</button>
            </div>
        </div>
    )
}
export default AdminInfo

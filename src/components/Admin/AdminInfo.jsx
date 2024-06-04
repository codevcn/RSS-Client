import { useEffect, useState } from 'react'
import { adminService } from '../../services/AdminService'
import AdminUpdate from './AdminUpdate'
import ChangePass from './ChangePass'
import './AdminInfo.scss'
const AdminInfo = () => {
    const [adminInfo, setAdminInfo] = useState({
        account: {},
        idcard: '',
        fullName: '',
        birthday: '',
        gender: '',
    })

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

    const handleReturnButtonClick = () => {
        window.history.back()
    }

    function editInfo(data) {
        setAdminInfo((pre) => ({ ...pre, ...data }));
        // setTimeout(() => {
        //     window.location.reload();
        // }, 500); 
    }
    
    return (
        <div className="AdminInfoContainer">
            <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                Quay lại
            </button>
            <div className="AdminInfo">
                {adminInfo && (
                    <div className="card-body p-2">
                        <h2>Admin Information</h2>
                        <div
                            className="py-2"
                            style={{ backgroundColor: '#e4e4e454', fontSize: '0.875em' }}
                        >
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Username
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {adminInfo.account?.username}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            ID Card
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {adminInfo.idcard}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Full Name
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {adminInfo.fullName}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Birthday
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {adminInfo.birthday}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Gender
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {adminInfo.gender}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="wrapper">
                    <div className="update">
                        <AdminUpdate 
                         adminInfo={adminInfo}
                         editInfo={editInfo}/>
                    </div>
                    <div className="Pass">
                        <ChangePass
                            id={adminInfo.account?.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminInfo

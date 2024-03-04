// import React, { useEffect, useState } from 'react';
// import { adminService } from '../../services/AdminService';
// import React, { useEffect, useState } from 'react'
// import Form from 'react-bootstrap/Form'
import './AdminGetAll.scss'
// import InputGroup from 'react-bootstrap/InputGroup'
// import Button from 'react-bootstrap/Button'
// import { forwardRef } from 'react'
// import { authService } from '../../services/AuthService'
// import { HttpRequestErrorHandler } from '../../utils/HttpRequestErrorHandler'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { listAdmin } from '../../services/AdminService'
const AdminGetAll = () => {
    // const [admins, setAdmins] = useState([]);

    // useEffect(() => {
    //     fetchAllAdmins();
    // }, []);

    // const fetchAllAdmins = async () => {
    //     try {
    //         const response = await adminService.requestAdminInfo('getAllAdmin');
    //         setAdmins(response);
    //     } catch (error) {
    //         console.error('Error fetching admins:', error);
    //     }
    // };

    return (
        <div>
            <h2>List of Admins</h2>
            <button class="add-button">Add</button>
            <table classname="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID Card</th>
                        <th>Full Name</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {admin.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.idcard}</td>
                            <td>{admin.fullName}</td>
                            <td>{admin.birthday}</td>
                            <td>{admin.gender}</td>
                            <td>{admin.accountUsername}</td>
                            <td>{admin.role}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    )
}
export default AdminGetAll

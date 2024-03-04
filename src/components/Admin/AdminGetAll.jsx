// import React, { useEffect, useState } from 'react';
// import { adminService } from '../../services/AdminService';

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
            <h1>List of Admins</h1>
            <table>
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
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.idcard}</td>
                            <td>{admin.fullName}</td>
                            <td>{admin.birthday}</td>
                            <td>{admin.gender}</td>
                            <td>{admin.accountUsername}</td>
                            <td>{admin.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminGetAll

import { useEffect, useState } from 'react'
import { studentService } from '../../services/StudentService'
import './StudentInfor.scss'
const StudentInfor = () => {
    const [StudentInfor, setStudentInfor] = useState()

    useEffect(() => {
        studentService
            .getStudentInfoLogin()
            .then((response) => {
                setStudentInfor(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleReturnButtonClick = () => {
        window.history.back()
    }

    return (
        <div className="AdminInfoContainerr">
            <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                Quay lại
            </button>
            <div className="AdminInfo">
                {StudentInfor && (
                    <div className="card-body p-2">
                        <h2>Thông Tin Sinh Viên</h2>
                        <div className="student-info">
                            <div className="info-item">
                                <span className="label">Mã SV:</span>
                                <span className="value value2">{StudentInfor.studentCode}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Họ và Tên:</span>
                                <span className="value">{StudentInfor.fullName}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Ngày Sinh:</span>
                                <span className="value value8">{StudentInfor.birthday}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Giới tính:</span>
                                <span className="value value7">{StudentInfor.gender}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Số CMND/ CCCD:</span>
                                <span className="value value6">{StudentInfor.idcard}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Số điện thoại:</span>
                                <span className="value value9">{StudentInfor.phone}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Mã Lớp:</span>
                                <span className="value value3">
                                    {StudentInfor.studentClass?.code}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="label">Tên Lớp:</span>
                                <span className="value value4">
                                    {StudentInfor.studentClass?.name}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="label">Chuyên ngành:</span>
                                <span className="value value5">{StudentInfor.major?.name}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default StudentInfor

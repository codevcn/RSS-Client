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
                        <div className="py-2" style={{ fontSize: '0.875em' }}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Họ và Tên:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.fullName}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Mã số Sinh Viên:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.studentCode}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Mã Lớp:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.studentClass?.code}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Tên Lớp:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.studentClass?.name}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Chuyên ngành:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.major?.name}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Số Căn Cước Công dân:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.idcard}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Giới tính:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.gender}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Ngày Sinh:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.birthday}
                                        </div>
                                    </div>
                                    <div className="col-sm-4 px-0">
                                        <div className="d-inline-block col-5 text-nowrap">
                                            Số điện thoại:
                                        </div>
                                        <div className="d-inline-block col-7 pl-0">
                                            {StudentInfor.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default StudentInfor

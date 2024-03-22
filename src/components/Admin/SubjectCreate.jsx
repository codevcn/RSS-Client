import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import './SubjectCreate.scss'

const SubjectCreate = () => {
    const [subject, setSubject] = useState({
        name: '',
        creditCount: '',
        majorID: '',
        majorName: '',
    })

    const [majors, setMajors] = useState([])
    const navigator = useNavigate()
    const { id } = useParams()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }))
    }
    useEffect(() => {
        adminService
            .getAllMajors()
            .then((majorsResponse) => {
                setMajors(majorsResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!subject.name || !subject.creditCount || !subject.majorID) {
            toast.error('Vui lòng điền đầy đủ thông tin.')
            return
        }
        adminService
            .createSubjectInfo({
                name: subject.name,
                creditCount: subject.creditCount,
                major: { majorID: subject.majorID },
            })
            .then(() => {
                toast.success('Cập nhật thành công')
                navigator('/admin/subject')
            })
            .catch((error) => {
                const errorHandler = new HttpRequestErrorHandler(error)
                errorHandler.handleAxiosError()
                toast.error(errorHandler.message)
            })
    }

    return (
        <div className="SubjectCreate">
            <br /> <br />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="text-center">Thêm Môn Học</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Tên Môn Học:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={subject.name}
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Số tín chỉ:</label>
                                    <input
                                        type="text"
                                        name="creditCount"
                                        className="form-control"
                                        value={subject.creditCount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Ngành:</label>
                                    <div className="select-container">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            name="majorID"
                                            value={subject.majorID}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Chọn ngành</option>
                                            {majors.map((major) => (
                                                <option key={major.majorID} value={major.majorID}>
                                                    {major.majorName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="Save-button btn btn-primary">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectCreate

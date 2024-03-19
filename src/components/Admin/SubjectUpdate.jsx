import React, { useEffect, useState } from 'react'
import './SubjectUpdate.scss'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { adminService } from '../../services/AdminService'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'

const SubjectUpdate = () => {
    const [subject, setSubject] = useState({
        name: '',
        creditCount: '',
        majorID: '',
        majorName: '',
    })

    const [majors, setMajors] = useState([])
    const navigator = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        Promise.all([
            adminService.getOneSubjectInfo(id),
            adminService.getAllMajors(),
        ])
            .then(([subjectResponse, majorsResponse]) => {
                setSubject(subjectResponse.data)
                setMajors(majorsResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSubject((prevSubject) => ({
            ...prevSubject,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!subject.name || !subject.creditCount || !subject.majorID) {
            toast.error('Vui lòng điền đầy đủ thông tin.')
            return
        }
        adminService
            .updateSubjectInfo(id, {
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
        <div className="SubjectUpdate">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="text-center">Chỉnh Sửa Môn Học</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label className="form-label">Tên Môn Học:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={subject.name}
                                        className='form-control'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Số tín chỉ:</label>
                                    <input
                                        type="text"
                                        name="creditCount"
                                        className='form-control'
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
                                                <option
                                                    key={major.majorID}
                                                    value={major.majorID}
                                                >
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

export default SubjectUpdate

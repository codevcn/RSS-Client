import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/AdminService'
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler'
import SubjectCreate from './SubjectCreate'
import './SubjectList.scss'
import SubjectUpdate from './SubjectUpdate'

const SubjectList = () => {
    const [subjects, setSubjects] = useState([])
    const [showConfirm, setShowConfirm] = useState(false)
    const [subjectId, setSubjectId] = useState(null)
    const navigator = useNavigate()
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [showAddForm, setshowAddForm] = useState(false)
    const [selectedAllsubject, setSelectedAllsubject] = useState({})
    const [selectedsubject, setSelectedsubject] = useState({})

    useEffect(() => {
        loadSubjects()
    }, [])

    const loadSubjects = () => {
        adminService
            .getAllSubjectInfo()
            .then((response) => {
                setSubjects(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function showUpdateModal(subject, subjects) {
        setSelectedAllsubject(subjects)
        setSelectedsubject(subject)
        setShowUpdateForm(true)
    }

    function showAddModal() {
        setSelectedAllsubject(subjects)
        setshowAddForm(true)
    }

    const confirmHideSubject = (id) => {
        setSubjectId(id)
        setShowConfirm(true)
    }

    const handleConfirm = () => {
        if (subjectId) {
            adminService
                .hideSubject(subjectId)
                .then(() => {
                    toast.success('Cập nhật thành công')
                    loadSubjects()
                })
                .catch((error) => {
                    const errorHandler = new HttpRequestErrorHandler(error)
                    errorHandler.handleAxiosError()
                    toast.error(errorHandler.message)
                })
                .finally(() => {
                    setShowConfirm(false)
                    setSubjectId(null)
                })
        }
    }

    const handleCancel = () => {
        setShowConfirm(false)
    }

    const handleReturnButtonClick = () => {
        window.history.back() // Go back one step in history
    }

    return (
        <div className="SubjectList">
            <div className="AddRegisterSession-title">
                <h2>Quản lý thông tin môn học</h2>
            </div>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
                <button className="add btn btn-primary" onClick={() => showAddModal(subjects)}>
                    + Thêm Môn Học
                </button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Mã Môn Học</th>
                        <th>Tên Môn Học</th>
                        <th>Nghành</th>
                        <th>Số Tín Chỉ</th>
                        <th className="action">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.subjectCode}</td>
                            <td>{subject.name}</td>
                            <td>{subject.major.name}</td>
                            <td>{subject.creditCount}</td>
                            <td className="action">
                                <Button
                                    className="edit-button"
                                    onClick={() => showUpdateModal(subject, subjects)}
                                >
                                    Chỉnh sửa
                                </Button>
                                <Button
                                    type="Button"
                                    className="hide btn btn-danger"
                                    onClick={() => confirmHideSubject(subject.id)}
                                >
                                    Ẩn
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showUpdateForm && (
                <SubjectUpdate
                    subjects={selectedAllsubject}
                    subject={selectedsubject}
                    show={showUpdateForm}
                    onHide={() => setShowUpdateForm(false)}
                />
            )}
            {showAddForm && (
                <SubjectCreate
                    subjects={selectedAllsubject}
                    show={showAddForm}
                    onHide={() => setshowAddForm(false)}
                />
            )}
            <Modal show={showConfirm} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn Ẩn môn học này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                    <Button variant="primary" onClick={handleCancel}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SubjectList

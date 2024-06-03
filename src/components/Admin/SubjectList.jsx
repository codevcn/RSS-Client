import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../hooks/toast'
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
    const toast = useToast()
    const [currentPages,setCurrentPages] = useState(1);
    const itemsPerPage = 5;
    const lastIndex = currentPages * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = subjects.slice(firstIndex, lastIndex);
    const pageCount = Math.ceil(subjects.length / itemsPerPage);
    const numbers = [...Array(pageCount + 1).keys()].slice(1)

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
    function editSubject(subjetData) {
        setSubjects((pre) =>
            pre.map((subject) => {
                if (subject.id === subjetData.id) {
                    return { ...subject, ...subjetData }
                } else return subject
            })
        )
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
        navigator(-1)
    }

    function changePages(n){
        setCurrentPages(n)
    };
    function prePage () {
        if(currentPages !== 1){
            setCurrentPages(currentPages - 1)
        }
    }
    function nextPage(){
        if(currentPages !== pageCount){
            setCurrentPages(currentPages + 1)
        }
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
                    {currentItems.map((subject) => (
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
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link'
                        onClick={prePage}>Pre</a>
                    </li>
                    {
                        numbers.map((n,i)=> (
                            <li className={` page-item ${currentPages === n ? 'active' : ''}`} key ={i}>
                                <a href='#' className='page-link'
                                onClick={() => changePages(n)} >{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href='#' className='page-link'
                        onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
            {showUpdateForm && (
                <SubjectUpdate
                    subjects={selectedAllsubject}
                    subject={selectedsubject}
                    show={showUpdateForm}
                    onHide={() => setShowUpdateForm(false)}
                    editSubject={editSubject}
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

import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Pagination from 'react-bootstrap/Pagination'
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
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchCriteria, setSearchCriteria] = useState('subjectCode')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const [selectedMajor, setSelectedMajor] = useState('')

    console.log('>>> run this')
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

        const filteredSubjects = subjects.filter((sub) => {
            const searchValue = searchKeyword.toLowerCase()
            const matchesSearchCriteria = () => {
                switch (searchCriteria) {
                    case 'subjectCode':
                        return sub.subjectCode.toLowerCase().includes(searchValue)
                    case 'name':
                        return sub.name.toLowerCase().includes(searchValue)
                    default:
                        return false
                }
            }
            const matchesMajor = selectedMajor === '' || sub.major.name === selectedMajor
            return matchesSearchCriteria() && matchesMajor
        })

        const indexOfLastSubject = currentPage * itemsPerPage
        const indexOfFirstSubject = indexOfLastSubject - itemsPerPage
        const currentSubjects = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject)

        const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage)

        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber)
        }

        const renderPagination = () => {
            let items = []
            for (let number = 1; number <= totalPages; number++) {
                items.push(
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </Pagination.Item>
                )
            }
            return (
                <div className="pagination-container">
                    <Pagination>{items}</Pagination>
                </div>
            )
        }

        return (
            <div className="SubjectList">
                <h2>Quản lý thông tin môn học</h2>
                <div className="button-container">
                    <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                        Quay lại
                    </button>
                    <div className="search-major-container">
                        <p>Lọc:</p>
                        <select
                            className="major-select styled-select major-select"
                            value={selectedMajor}
                            onChange={(e) => setSelectedMajor(e.target.value)}
                        >
                            <option value="">Tất cả các ngành</option>
                            {subjects
                                .map((sub) => sub.major.name)
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .map((major) => (
                                    <option key={major} value={major}>
                                        {major}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="search-container">
                        <select
                            className="search-select styled-select"
                            value={searchCriteria}
                            onChange={(e) => setSearchCriteria(e.target.value)}
                        >
                            <option value="subjectCode">Mã môn học</option>
                            <option value="name">Tên môn học</option>
                        </select>
                        <input
                            type="text"
                            className="search-input styled-input"
                            placeholder="Tìm kiếm môn học..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                    <button className="add-button" onClick={() => showAddModal(subjects)}>
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
                        {currentSubjects.map((subject) => (
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
                {renderPagination()}
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
}

export default SubjectList

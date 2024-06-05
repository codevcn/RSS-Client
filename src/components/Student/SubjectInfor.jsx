import { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/AdminService'
import { studentService } from '../../services/StudentService'
import './SubjectInfor.scss'

const SubjectInfor = () => {
    const [subjects, setSubjects] = useState([])
    const [student, setStudent] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const navigator = useNavigate()
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchCriteria, setSearchCriteria] = useState('subjectCode')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7

    useEffect(() => {
        loadSubjects()
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('currentUser')
            const userObj = JSON.parse(storedUser)
            setCurrentUser(userObj)
            studentService
                .findStudentByUserName(userObj.username)
                .then((response) => {
                    setStudent(response.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchUserData()
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
        return matchesSearchCriteria()
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
        <div className="SubjectListInfor">
            <h2>Thông tin môn học</h2>
            <div className="button-container">
                <button className="return btn btn-primary" onClick={handleReturnButtonClick}>
                    Quay lại
                </button>
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
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Mã Môn Học</th>
                        <th>Tên Môn Học</th>
                        <th>Số Tín Chỉ</th>
                        <th>Mã ngành</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSubjects.map((subject) => {
                        if (
                            subject &&
                            subject.major &&
                            student &&
                            student.major &&
                            subject.major.id === student.major.id
                        ) {
                            return (
                                <tr key={subject.id} className="hover-row">
                                    <td>{subject.subjectCode}</td>
                                    <td>{subject.name}</td>
                                    <td>{subject.creditCount}</td>
                                    <td>{subject.major.name}</td>
                                </tr>
                            )
                        } else {
                            return null
                        }
                    })}
                </tbody>
            </table>
            {renderPagination()}
        </div>
    )
}

export default SubjectInfor

import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/debounce';
import { studentService } from '../../services/StudentService';
import StudentDetailModal from '../Student/StudentDetailModal'
import './SearchStudent.scss';

export const SearchStudent = () => {
    const [input, setInput] = useState('');
    const [students, setStudents] = useState([]); 
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});
    const debounce = useDebounce();
    
    useEffect(() => {
        studentService
            .getStudentInfo()
            .then((response) => {
                setStudents(response.data || []); 
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const fetchData = (value) => {
        const results = students.filter((student) => {
            return (
                student.studentCode.toLowerCase().includes(value.toLowerCase()) ||
                student.fullName.toLowerCase().includes(value.toLowerCase())
            );
        });
        setSearchResults(results);
    };

    const handleChange = (input) => {
        setInput(input);
    };

    const handleClick = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    };

    useEffect(() => {
        if (input === '') {
            setSearchResults([]);
        } else {
            debounce(() => fetchData(input), 300);
            fetchData(input);
        }
    }, [input]);

    return (
        <div className="SearchStudent">
            <div className="Search-container">
                <div className="Search-title">
                    <div className="search-bar-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Nhập tên hoặc mã số sinh viên của sinh viên..."
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <div className="search-btn">
                            <i className="bi bi-search"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-results">
                <ul>
                    {input && searchResults.length === 0 ? (
                        <li className="no-results">Không tìm thấy kết quả phù hợp</li>
                    ) : (
                        searchResults.map((student) => (
                            <li key={student.id} onClick={() => handleClick(student)}>
                                <i className="bi bi-search"></i>
                                <div>{student.studentCode}</div>
                                <div>{student.fullName}</div>
                                <div>{student.major.name}</div>
                                <div>{student.deleted ? 'nghỉ học' : 'đang học'}</div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <StudentDetailModal
                show={showModal}
                onHide={() => setShowModal(false)}
                student={selectedStudent}
            />
        </div>
    );
};

export default SearchStudent;

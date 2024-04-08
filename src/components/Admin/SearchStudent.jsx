import { useState } from 'react'
import { useDebounce } from '../../hooks/debounce'
import './SearchStudent.scss'

export const SearchStudent = () => {
    const [result, setResult] = useState(null)
    const debounce = useDebounce()

    const searching = async () => {}

    return (
        <div className="SearchStudent">
            <div className="SearchStudent-container">
                <div className="SearchStudent-title">
                    <div className="search-bar-box">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Nhập tên hoặc mã số sinh viên của sinh viên..."
                            onChange={debounce(searching, 300)}
                        />
                        <div className="search-btn">
                            <i className="bi bi-search"></i>
                        </div>
                    </div>
                </div>
                <div className="result"></div>
            </div>
        </div>
    )
}

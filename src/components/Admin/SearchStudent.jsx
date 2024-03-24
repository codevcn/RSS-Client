import { useState } from 'react'
import { useDebounce } from '../../hooks/debounce'
import './SearchStudent.scss'

export const SearchStudent = () => {
    const [result, setResult] = useState(null)
    const debounce = useDebounce()

    const searching = async () => {}

    return (
        <div className="SearchStudent">
            <div className="search-bar-box">
                <input type="text" className="search-bar" onChange={debounce(searching, 300)} />
            </div>
            <div className="result"></div>
        </div>
    )
}

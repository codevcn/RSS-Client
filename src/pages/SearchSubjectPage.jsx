import React, { useState } from 'react'
import { getSubjectInfo_api } from '../apis/subjectApi'
import SearchBar from '../components/SearchBar'
import SearchResult from '../components/SearchResult'
import SearchResults from '../components/SearchResult'

const SearchSubjectPage = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResult] = useState(null)

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }

    const handleSearch = async () => {
        setLoading(true)

        try {
            const data = await getSubjectInfo_api(input)
            console.log(input)
            console.log(data)
            setResult(data.data)
        } catch (error) {
            console.log(input)
            setResult({ error })
        }

        setLoading(false)
    }

    return (
        <div>
            <SearchBar
                value={input}
                onChange={handleInputChange}
                onSearch={handleSearch} // Gọi hàm handleSearch khi nhấn nút tìm kiếm
                loading={loading}
            />
            <SearchResults results={results} />
        </div>
    )
}

export default SearchSubjectPage

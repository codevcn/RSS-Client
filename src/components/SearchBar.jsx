import './SearchBar.scss'

const SearchBar = ({ value, onChange, onSearch, loading }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch() // Gọi hàm onSearch khi nhấn phím Enter
        }
    }

    return (
        <div className="container">
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyPress={handleKeyPress} // Gọi hàm handleKeyPress khi nhấn phím
                />
                <button onClick={onSearch} disabled={loading}>
                    Tìm Kiếm
                </button>
            </div>
        </div>
    )
}

export default SearchBar

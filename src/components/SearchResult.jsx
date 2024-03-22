const SearchResults = ({ results, error }) => {
    if (error) {
        return <div>Error: {error}</div>
    }

    if (!results) {
        return null
    }

    return (
        <div>
            <p>ID: {results.id}</p>
            <p>Name: {results.name}</p>
            <p>Credit Count: {results.creditCount}</p>
            <p>Major ID: {results.major.majorID}</p>
            <p>Major Name: {results.major.majorName}</p>
        </div>
    )
}

export default SearchResults

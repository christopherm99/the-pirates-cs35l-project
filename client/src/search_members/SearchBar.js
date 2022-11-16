
const SearchBar = ({ Users, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(Users)

        const resultsArray = Users.filter(Users => Users.name.includes(e.target.value) || Users.email.includes(e.target.value))
        setSearchResults(resultsArray)
    }
    return(
        <header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
            </form>
        </header>
    )
}
export default SearchBar
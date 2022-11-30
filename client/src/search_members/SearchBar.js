import './SearchBar.css'
const SearchBar = ({ Users, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault();
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(Users);

    const resultsArray = Users.filter(
      (Users) =>
        Users.name.includes(e.target.value) ||
        Users.email.includes(e.target.value)
    );
    setSearchResults(resultsArray);
  };
  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input className="search-users" type="text" id="search" onChange={handleSearchChange} placeholder="Search Users..."/>
    </form>
  );
};
export default SearchBar;

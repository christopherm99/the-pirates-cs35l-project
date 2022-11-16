import axios from "axios";
import React from "react";
import SearchBar from "./SearchBar";
import ListPage from "./ListPage";
function SearchUsers() {
  const[searchResults, setsearchResults] = React.useState([])
  const[users, setUsers] = React.useState([])
  React.useEffect(() => {
    axios.get(`/api//users/all`).then((response) => {
      setUsers(response.data.all);
      console.log(response.data.all);
    });
  }, [])

  return(
    <>
    <SearchBar Users={users} setSearchResults={setsearchResults}/>
    <ListPage searchResults={searchResults} />
    </>
  )
}

export default SearchUsers;
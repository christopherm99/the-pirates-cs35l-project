import axios from "axios";
import React from "react";
import SearchBar from "./SearchBar";
import ListPage from "./ListPage";
import "./SearchUsers.css";

function SearchUsers() {
  const [searchResults, setsearchResults] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    axios.get(`/api//users/all`).then((response) => {
      setUsers(response.data.all);
      setsearchResults(response.data.all);
      console.log(response.data.all);
    });
  }, []);

  return (
    <>
      <div className="searchbar-div">
        <SearchBar Users={users} setSearchResults={setsearchResults} />
      </div>
      <ListPage className="list" searchResults={searchResults} />
    </>
  );
}

export default SearchUsers;

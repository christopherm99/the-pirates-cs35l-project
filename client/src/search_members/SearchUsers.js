import axios from "axios";
import React from "react";
import SearchBar from "./SearchBar";
import ListPage from "./ListPage";
import "./SearchUsers.css";
import Wave from 'react-wavify'

function SearchUsers() {
  const [searchResults, setsearchResults] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    axios.get(`/api//users/all`).then((response) => {
      setUsers(response.data.all);
      setsearchResults(response.data.all);
    });
  }, []);

  return (
    <div className="searchbar-container">
      <div className="searchbar-div">
        <SearchBar Users={users} setSearchResults={setsearchResults} />
      </div>
      <ListPage className="list" searchResults={searchResults} />
      {/* <Wave fill='#032F8A'
        paused={false}
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.25,
          points: 3
        }}
      /> */}
      <Wave fill="url(#gradient)" speed="0.3">
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%"  stopColor="#5EC3D9" />
            <stop offset="90%" stopColor="#466582" />
          </linearGradient>
        </defs>
      </Wave>
    </div>
  );
}

export default SearchUsers;

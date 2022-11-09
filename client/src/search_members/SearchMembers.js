import React from 'react';
import Search from './Search';
// import initialDetails from './InitialDetails';
import axios from "axios";

function SearchMembers() {
  const [userData, setuserData] = React.useState({});
  
  axios.get(`http://localhost:8080/api/users/all`).then((response) => {
    setuserData(response.data)
  });

  return (

    <div className="tc bg-green ma0 pa4 min-vh-100">
      {/* <Search details={initialDetails}/> */}
      <Search details={userData}/>
    </div>
  );
}

export default SearchMembers;
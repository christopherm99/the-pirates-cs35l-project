import './Navbar.css';
import React from 'react';
import axios from "axios";

export default function Navbar({searchWeekButton, returnHomeButton, submitFormButton, loginButton, searchMembers}) {
  // searchWeekButton, returnHomeButton, and submitFormButton are each booleans.
  // if the boolean is true, then we show the corresponding button.
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUserName, setCurrentUserName] = React.useState("");

  React.useEffect(() => {
    axios.get(`/api/users`)
      .then((response) => {
        // we query the /api/users endpoint to see if we are currently logged in or not.
        // The endpoint returns data about the current user if we are logged in, 
        // and gives a 403 error if we are not.
        console.log(response);
        if (response.status === 200) {
          setIsLoggedIn(true);
          setCurrentUserName(response.data.name);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, [])

  const handleLogOut = () => {
    console.log("logging out...")
    axios.post('/logout')
      .then((response) => {
        console.log("logged out")
        console.log(response)
        window.location.href="/"
      })
  }


  return (
    <div className="navbar">
      <div className="nav--months">January 2022</div>
      {isLoggedIn && <div className="nav--current-user-label">Logged In As {currentUserName}</div>}
      {loginButton && 
        <> 
          {!isLoggedIn && 
            <a className="form-button" href="http://localhost:8080/login/federated/google">Log In</a>
          }
          {isLoggedIn && 
            <a className="form-button" onClick={handleLogOut}>Log Out</a>
          }
        </>
      }
      {submitFormButton && 
        <a className="form-button" href="/submitform">Submit Availability Form</a>
      }
      {searchWeekButton && 
        <a className="form-button" href="/search-weeks">Search Past Weeks</a>
      }
      {returnHomeButton && 
        <a className="form-button" href="/">Home</a>
      }
      {searchMembers &&
      <a className="form-button" href="/search-members"> Search Members</a>

      }
    </div>
  )
}
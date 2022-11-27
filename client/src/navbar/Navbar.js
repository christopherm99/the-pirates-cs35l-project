import "./Navbar.css";
import React from "react";
import axios from "axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUserName, setCurrentUserName] = React.useState("");
  const [hamburgerMenu, setHamburgerMenu] = React.useState(false);

  const dateNow = new Date();

  React.useEffect(() => {
    axios.get(`/api/users`).then((response) => {
      // we query the /api/users endpoint to see if we are currently logged in or not.
      // The endpoint returns data about the current user if we are logged in,
      // and gives a 403 error if we are not.

      if (response.status === 200) {
        setIsLoggedIn(true);
        setCurrentUserName(response.data.name);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function hamburger() {

    setHamburgerMenu( ! hamburgerMenu );
  }

  const handleLogOut = () => {
    axios.post("/logout").then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="navbar">
      <div className="pl-2">
        <a className="form-button" href="/">
          Home
        </a>
      </div>
      <div className="nav--months">
        {dateNow.toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        })}
      </div>
      {isLoggedIn && (
        <div className="nav--current-user-label">
          Logged In As {currentUserName}
        </div>
      )}

      <>
        {!isLoggedIn && (
          <a
            className="form-button"
            href="http://localhost:8080/login/federated/google"
          >
            Log In
          </a>
        )}
        {isLoggedIn && (
          <a 
            className="form-button"
            onClick={handleLogOut}
            href="/"
          >
            Log Out
          </a>
        )}
      </>

      {isLoggedIn && windowSize.innerWidth > 800 && (
        <a className="form-button" href="/submitform">
          Submit Availability Form
        </a>
      )}
      {isLoggedIn && windowSize.innerWidth > 800 && (
        <a className="form-button" href="/search-weeks">
          Search Past Weeks
        </a>
      )}
      {isLoggedIn && windowSize.innerWidth > 800 && (
        <a className="form-button" href="/search-members">
          {" "}
          Search Members
        </a>
      )}
      {windowSize.innerWidth <= 800 && isLoggedIn && 
      <button class="hamburger" onClick={hamburger} >
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </button>
      }
      {hamburgerMenu && isLoggedIn && windowSize.innerWidth <= 800 && <>
        <button className="hamburger-menu" >
          {isLoggedIn &&
           <a className="form-button" href="/submitform">
          Submit Availability Form
          </a>
          }
          {isLoggedIn &&
          <a className="form-button" href="/search-weeks">
          Search Past Weeks
          </a>
          }
          {isLoggedIn &&
          <a className="form-button" href="/search-members">
          {" "}
          Search Members
        </a>
        }
        </button>
      </>
      }
    </div>
  );
}


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
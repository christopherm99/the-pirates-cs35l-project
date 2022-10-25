import './Navbar.css';

export default function Navbar({searchWeekButton, returnHomeButton, submitFormButton, loginButton}) {
  // searchWeekButton, returnHomeButton, and submitFormButton are each booleans.
  // if the boolean is true, then we show the corresponding button.

  return (
    <div className="navbar">
      <div className="nav--months">January 2022</div>
      {loginButton && 
        <a className="form-button" href="http://localhost:8080/login/federated/google">Log In</a>
      }
      {submitFormButton && 
        <a className="form-button" href="/submitform">Submit Availability Form</a>
      }
      {searchWeekButton && 
        <a className="form-button" href="/calendar">Search Past Weeks</a>
      }
      {returnHomeButton && 
        <a className="form-button" href="/">Home</a>
      }
    </div>
  )
}
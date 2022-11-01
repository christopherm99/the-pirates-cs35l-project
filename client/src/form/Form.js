import "./Form.css";
import Navbar from "../navbar/Navbar";
import React from "react";
import axios from "axios";


export default function CalendarPage() {
  // This is the page where users will submit the form weekly to give their availability for carpooling.
  // This page should first check if the user is authenticated or not,
  // and if the user is not logged in, we should either show an error or redirect them to the home page.

  const [daysChecked, setDaysChecked] = React.useState([false, false, false, false]);
  const [selectedTimes, setSelectedTimes] = React.useState([null, null, null, null]);
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday"];

  const [canDrive, setCanDrive] = React.useState(null);
  const [numSeatsInput, setNumSeatsInput] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");


  const handleDayTimeUpdate = (index, newTime) => {
    const newSelectedTimes = [...selectedTimes];
    newSelectedTimes[index] = newTime;
    setSelectedTimes(newSelectedTimes);
  }


  const toggleDay = index => {
    const newDaysChecked = [...daysChecked];
    newDaysChecked[index] = !newDaysChecked[index];
    setDaysChecked(newDaysChecked)

    if (!newDaysChecked[index]) {
      handleDayTimeUpdate(index, null);
    }
  }

  const verifyFormData = () => {
    for (let index = 0; index < dayNames.length; index ++) {
      if (daysChecked[index] && selectedTimes[index] === null) {
        return `Please select a time for ${dayNames[index]}`;
      }
    }
    if (canDrive === null) {
      return `Please select whether you can drive.`;
    }
    if (canDrive) {
      if (isNaN(parseInt(numSeatsInput)) || parseInt(numSeatsInput) < 1) {
        return "Please enter a valid number of seats";
      }
    }
    return "";
  }

  const handleSubmit = () => {
    let error = verifyFormData();
    console.log(error);
    if (error) {
      setErrorMsg(error);
    } else {
      // make post request here
      axios.post(`/api/signup`, {
        days_to_practice: {
          Tuesday: selectedTimes[0],
          Wednesday: selectedTimes[1],
          Thursday: selectedTimes[2],
          Friday: selectedTimes[3],
        },
        car_capacity: parseInt(numSeatsInput) || 0,
      
      }).then((response) => {
        window.location.href="/"
      });
    }
  }


  return (
    <>
      <Navbar returnHomeButton loginButton/>
      <div className="form">
        <div className="main-question">
          <div>
            Which days can you come?
          </div>
          {dayNames.map((dayName, index) => {
            return (
              <div>
                <label>
                  <input type="checkbox" className="check-day" checked={daysChecked[index]} onChange={() => {toggleDay(index)}}/>
                  {dayName}
                </label>

                
                {daysChecked[index] && 
                  <div className="form-check mini-question">
                    <>
                      <label>
                        <input
                          type="radio"
                          value="option1"
                          checked={selectedTimes[index] === "2:00"}
                          onChange={() => handleDayTimeUpdate(index, "2:00")}
                          className="form-check-input"
                        />
                        2:00
                      </label>
                    </>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          value="2:15"
                          checked={selectedTimes[index] === "2:15"}
                          onChange={() => handleDayTimeUpdate(index, "2:15")}
                          className="form-check-input"
                        />
                        2:15
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          value="2:30"
                          checked={selectedTimes[index] === "2:30"}
                          onChange={() => handleDayTimeUpdate(index, "2:30")}
                          className="form-check-input"
                        />
                        2:30
                      </label>
                    </div>
                  </div>
                }
              </div>
            )
          })}
        </div>

        <div className="main-question">
          <div>
            <div>
              Can you drive?
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={canDrive === true}
                  onChange={() => setCanDrive(true)}
                  className="form-check-input"
                />
                Yes
              </label>
            </div>

            <div className="form-check">
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={canDrive === false}
                  onChange={() => setCanDrive(false)}
                  className="form-check-input"
                />
                No
              </label>
            </div>

            {canDrive && 
              <div className="mini-question">
                <label>
                How many seats? (including yourself)<br/>
                  <input
                    type="text"
                    value={numSeatsInput}
                    onChange={(event) => setNumSeatsInput(event.target.value)}
                    className="inputtext"
                    placeholder="input seats"
                  />
                </label>
              </div>
            }

          </div>
        </div>
        <div className="button-container">
          <button className="submit" onClick={handleSubmit}>
            submit
          </button>
        </div>
        <div className="error-message">
          {errorMsg}
        </div>
      </div>
    </>
  )
}

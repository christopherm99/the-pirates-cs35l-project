import "./Form.css";
import Navbar from "../navbar/Navbar";
import React from "react";

export default function CalendarPage() {
  // This is the page where users will submit the form weekly to give their availability for carpooling.
  // This page should first check if the user is authenticated or not,
  // and if the user is not logged in, we should either show an error or redirect them to the home page.

  const [daysChecked, setDaysChecked] = React.useState([false, false, false, false]);
  const [selectedTimes, setSelectedTimes] = React.useState([null, null, null, null]);
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday"];

  const [canDrive, setCanDrive] = React.useState(null);
  const [numSeatsInput, setNumSeatsInput] = React.useState("");


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

  


  return (
    <>
      <Navbar returnHomeButton loginButton/>
      <div>
        Which days can you come?
      </div>
      {dayNames.map((dayName, index) => {
        return (
          <div>
            <label>
              <input type="checkbox" checked={daysChecked[index]} onChange={() => {toggleDay(index)}}/>
              {dayName}
            </label>

            
            {daysChecked[index] && 
              <>
                <div className="form-check">
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
                </div>

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
              </>
            }
          </div>
        )
      })}

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
          <>
            <label>
              <input
                type="text"
                value={numSeatsInput}
                onChange={(event) => setNumSeatsInput(event.target.value)}
              />
              How many seats? (including yourself)
            </label>
          </>
        }

      </div>

      <button>
        Submit
      </button>


    </>
  )
}

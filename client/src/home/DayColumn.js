import moment from "moment";
import React from "react";
import CarpoolChip from "./CarpoolChip";
import "./DayColumn.css";
export default function DayColumn({ dateString, carsLeaving }) {
  // dateString should be an ISO datestring such as "2022-10-11"
  // This component is a column representing a single day's cars.
  // This is rendered on the home page as well as the search-past-weeks page

  let dateMomentObj = moment(dateString);

  carsLeaving = carsLeaving.sort(
    function(a, b) {
      if (carHasDriver(a) && !carHasDriver(b)) {
        return -1;
      } else if (!carHasDriver(a) && carHasDriver(b)) {
        return 1;
      }
      return 0;
    }
  );

  // styles are from Homepage.css
  return (
    <div className="day">
      <div>
        <div className="date-num">
          {dateMomentObj.format("D")}
        </div>
        <div className="week-day">
          {dateMomentObj.format("dddd")}
        </div>
      </div>
      <div className="carpools">
        {carsLeaving.filter(car => carHasDriver(car)).map((car) => (
          <CarpoolChip
            passengers={car.passengers}
            leave_time={car.leave_time}
            driver={car.driver}
          />
        ))}
      </div>
      <div>
        {carsLeaving.filter(car => !carHasDriver(car)).map((car) => (
          <CarpoolChip
            passengers={car.passengers}
            leave_time={car.leave_time}
            driver={car.driver}
          />
        ))}
      </div>
    </div>
  );
}

function carHasDriver(car) {
  return car && car.driver && car.driver.name;
}

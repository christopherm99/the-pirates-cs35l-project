import moment from 'moment';
import React from "react"
import CarpoolChip from "./CarpoolChip"
export default function DayColumn({dateString, carsLeaving}) {
  // dateString should be an ISO datestring such as "2022-10-11"
  let dateMomentObj = moment(dateString);

  return(
      <div className="day">
          <div className="day-date">
              <div className="date-num">{dateMomentObj.format('D')}</div>
              <div className="week-day">{dateMomentObj.format('dddd')}</div>
          </div>
          <div className="carpools">
            {carsLeaving.map(car => (
              <CarpoolChip passengers={car.passengers} depart_time={car.depart_time} driver={car.driver} />
            ))}
          </div>
      </div>
  )
}

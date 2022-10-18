import React from "react"
import CarpoolChip from "./CarpoolChip"
export default function DayColumn(props) {
  const dataForADay = {
    passengers: ["Joe Burger", "Angus Burger", "Super Burger", "Beyond Burger"],
    leaveTime: "2:00",
    driver: "Chris Milan",
  }
  return(
      <div className="day">
          <div className="day-date">
              <div className="date-num">10</div>
              <div className="week-day">sunday</div>
          </div>
          <div className="carpools">
              <CarpoolChip passengers={dataForADay.passengers} leaveTime={dataForADay.leaveTime} driver={dataForADay.driver} />
              <CarpoolChip passengers={dataForADay.passengers} leaveTime={dataForADay.leaveTime} driver={dataForADay.driver} />
          </div>
      </div>
  )
}

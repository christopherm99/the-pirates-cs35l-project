import React from "react"

const CarpoolChip = ({passengers, leaveTime, driver}) => {
  return (
    <div className="Carpool">
      <div className="carpool--time">{leaveTime}</div>
      <div className="carpool--driver-display">{driver}'s car</div>
      {
        passengers.map(passenger => (
          <div className="carpooler">{passenger}</div>
        ))
      }
    </div>
  )
}

export default CarpoolChip;
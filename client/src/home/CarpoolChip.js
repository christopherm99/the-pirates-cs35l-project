import React from "react"

const CarpoolChip = ({passengers, depart_time, driver}) => {
  return (
    <div className="Carpool">
      <div className="carpool--time">{depart_time}</div>
      <div className="carpool--driver-display">{driver.name}'s car</div>
      {
        passengers.map(passenger => (
          <div className="carpooler">{passenger.name}</div>
        ))
      }
    </div>
  )
}

export default CarpoolChip;
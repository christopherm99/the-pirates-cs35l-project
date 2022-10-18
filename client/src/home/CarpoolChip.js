import React from "react"

const CarpoolChip = ({passengers, depart_time, driver}) => {
  console.log("passengers: " + passengers);
  console.log("depart time: " + depart_time);
  console.log("driver: " + driver);
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
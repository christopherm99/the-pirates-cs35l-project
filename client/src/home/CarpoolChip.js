import React from "react"

const CarpoolChip = ({passengers, leave_time, driver}) => {
  return (
    <div className="bg-purple-300 pt-1 pb-1.5 px-2.5
    my-1 mx-0 rounded-xl">
      <div className="font-light text-lg">{leave_time}</div>
      <div className="font-light text-sm mx-0 my-1">{driver.name}'s car</div>
      {
        passengers.map(passenger => (
          <div className="font-light text-xs mx-0 my-[0.5] leading-3">{passenger.name}</div>
        ))
      }
    </div>
  )
}

export default CarpoolChip;
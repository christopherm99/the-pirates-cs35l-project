import React from "react";

const CarpoolChip = ({ passengers, leave_time, driver }) => {
  const date = new Date(leave_time);

  const options = { hour: "numeric", minute: "numeric" };

  let chipColors = [  
    "bg-red-300",
    "bg-orange-200",
    "bg-blue-300",
    "bg-yellow-200",
    "bg-green-300",
    "bg-purple-300"
  ]

  let innerChipColors = [  
    "bg-red-200",
    "bg-orange-100",
    "bg-blue-200",
    "bg-yellow-100",
    "bg-green-200",
    "bg-purple-200"
  ]
  
  let passengerString = "";
  for (let i of passengers) {
    passengerString += i.name;
  }

  // "randomly" chooses a color based on the hash of a string
  let string_hash = Math.abs(stringToHash(leave_time + passengerString + driver.name)) % (chipColors.length);
  console.log(string_hash)
  let chipColor = chipColors[string_hash] +  " pt-1 pb-1.5 px-2.5 my-1 mx-0 rounded-xl";
  let innerChipColor = innerChipColors[string_hash] + " p-1 rounded mb-1";
  return (
    <div
      className={chipColor}
    >
      <div className="font-light text-lg">
        {date.toLocaleDateString(undefined, options)}
      </div>
      <div className="font-light text-sm mx-0 my-1">{driver.name}'s car</div>
      <div></div>
      
      <div className={innerChipColor}>
      {passengers.map((passenger) => (
        <div className="font-light text-xs mx-0 my-[0.5] leading-3 py-0.5">
          {passenger.name}
      </div>
      ))}
      </div>
    </div>
  );
};


//simple hashing function taken from GeeksForGeeks
function stringToHash(string) {             
  var hash = 0; 
  if (string.length == 0) return hash;
  for (let i = 0; i < string.length; i++) {
      let char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
  return hash;
}

export default CarpoolChip;

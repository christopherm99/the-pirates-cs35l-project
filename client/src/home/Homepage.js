import "./Homepage.css";
import DayColumn from "./DayColumn.js";
import Navbar from "../navbar/Navbar";

export default function Homepage() {
  const carsLeaving = [
    {
      passengers: ["Joe Burger", "Angus Burger", "Super Burger", "Beyond Burger"],
      leaveTime: "2:00",
      driver: "Chris Milan",
    },
    {
      passengers: ["Joe Burger", "Angus Burger", "Super Burger", "Beyond Burger"],
      leaveTime: "2:17",
      driver: "Chris Milan",
    },
  ]
  
  return (
    <>
      <Navbar searchWeekButton submitFormButton signupButton/>
      <div className="week">
        <DayColumn dateString="2022-10-16" carsLeaving={carsLeaving} />
        <DayColumn dateString="2022-10-17" carsLeaving={carsLeaving} />
        <DayColumn dateString="2022-10-18" carsLeaving={carsLeaving} />
        <DayColumn dateString="2022-10-19" carsLeaving={carsLeaving} />
        <DayColumn dateString="2022-10-20" carsLeaving={carsLeaving} />
        <DayColumn dateString="2022-10-21" carsLeaving={carsLeaving} />
        <DayColumn dateString="2022-10-22" carsLeaving={carsLeaving} />
      </div>
      </>
  )
}
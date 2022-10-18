import DayColumn from "./DayColumn.js";
import "./Homepage.css";

export default function Homepage() {
  return (
    <>
      <div className="navbar">
        <div className="nav--months">January 2022</div>
        <a className="form-button">sign up</a>
        <a className="form-button">search week</a>
      </div>
      <div className="week">
        <DayColumn />
        <DayColumn />
        <DayColumn />
        <DayColumn />
        <DayColumn />
        <DayColumn />
        <DayColumn />
      </div>
      </>
  )
}
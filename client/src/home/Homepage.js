import "./Homepage.css";
import DayColumn from "./DayColumn.js";
import Navbar from "../navbar/Navbar";
import React from "react";
import axios from "axios";
import moment from "moment";

export default function Homepage() {
  const [days, setDays] = React.useState({});

  React.useEffect(() => {
    axios.get(`/api/practice`).then((response) => {
      setDays(response.data);
    });
  }, []);

  var dayArr = [];
  for (var key in days) {
    if (days.hasOwnProperty(key)) {
      dayArr.push([key, days[key]]);
    }
  }

  const cards = dayArr.map((item) => {
    const [key, value] = item;
    const firstDayOfCurrentWeek = moment().startOf("week"); // This will be a Sunday
    let today = null;
    if (key === "Tuesday") {
      today = firstDayOfCurrentWeek.add(2, "days");
    } else if (key === "Wednesday") {
      today = firstDayOfCurrentWeek.add(3, "days");
    } else if (key === "Thursday") {
      today = firstDayOfCurrentWeek.add(4, "days");
    } else if (key === "Friday") {
      today = firstDayOfCurrentWeek.add(5, "days");
    } else if (key === "Monday") {
      today = firstDayOfCurrentWeek.add(1, "days");
    }

    return (
      <DayColumn dateString={today.format("YYYY-MM-DD")} carsLeaving={value} />
    );
  });

  return (
    <>
      <div className="week">{cards}</div>
    </>
  );
}

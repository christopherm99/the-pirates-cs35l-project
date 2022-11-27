import "./Homepage.css";
import DayColumn from "./DayColumn.js";
import React from "react";
import axios from "axios";
import moment from "moment";

export default function Homepage() {
  const [days, setDays] = React.useState({});

  const daysOfWeek = ["Tuesday", "Wednesday", "Thursday", "Friday"];

  React.useEffect(() => {
    axios.get(`/api/practice`).then((response) => {
      setDays(response.data);
    });
  }, []);

  // an array where each element represents a day of the week
  var dayArr = [];

  for (var key of daysOfWeek) {
    if (days.hasOwnProperty(key)) {
      dayArr.push([key, days[key]]);
    } else {
      dayArr.push([key, []]);
    }
  }

  // cards is a list of day columns representing the days on which there will be a car leaving.
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
      // This should never happen, since we don't support Monday
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

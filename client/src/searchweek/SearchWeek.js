import "./SearchWeek.css";
import DayColumn from "../home/DayColumn";
import React from "react";
import axios from "axios";
import moment from "moment";

export default function SearchWeek() {
  const [weekString, setWeekString] = React.useState(moment().startOf("week").format("YYYY-MM-DD"));
  const [displayCards, setDisplayCards] = React.useState("loading display cards...");

  React.useEffect(() => {
    axios.get(`/api/practice/${weekString}`).then((resp) => {

      // an array where each element represents a day of the current week
      var dayArr = [];
      var days = resp.data;
      let currentWeekHasPractices = false;
      const daysOfWeek = ["Tuesday", "Wednesday", "Thursday", "Friday"];
      for (var key of daysOfWeek) {
        if (days.hasOwnProperty(key)) {
          dayArr.push([key, days[key]]);
          currentWeekHasPractices = true;
        } else {
          dayArr.push([key, []]);
        }
      }

      let newCards = dayArr.map((item) => {
        const [key, value] = item;
        const firstDayOfCurrentWeek = moment(
          getDateObjFromString(weekString)
        ).startOf("week"); // This will be a Sunday

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
          <DayColumn
            dateString={today.format("YYYY-MM-DD")}
            carsLeaving={value}
          />
        );
      });

      let thisDate = getDateObjFromString(weekString);
      let today = new Date();
      console.log(today);

      if (thisDate > today) {
        newCards = <div className="warning">😧 WHOOPS 😧<br/>🔥 This week hasn't happened yet 🔥 </div>;
      } else if (!currentWeekHasPractices) {
        newCards = <div className="warning">⚠️☹️ No Rides this Week ☹️⚠️</div>;
      }
      setDisplayCards(newCards);
    });
  }, [weekString]);

  function changeWeek(week) {
    let date = week.match(/\b(\w+)\b/g);
    date[1] = parseInt(date[1].substr(1));
    let currentWeek = new Date(date[0], 0, (date[1] - 1) * 7 + 3);
    let currWeekString = `${currentWeek.getFullYear()}-${
      currentWeek.getMonth() + 1
    }-${currentWeek.getDate()}`;
    setWeekString(currWeekString);
    getWeekRange(week);
  }

  function getWeekRange(week) {
    let currentWeek = moment(getDateObjFromString(week)).startOf("week"); // This is a sunday
    let currentMonday = currentWeek.clone().add(1, 'days');
    let currentFriday = currentWeek.clone().add(5, 'days');
    let mondayString = currentMonday.format('dddd MMM D');
    let fridayString = currentFriday.format('dddd MMM D');
    let yearString = currentFriday.format('YYYY')
    return `${mondayString} to ${fridayString}, ${yearString}`;
  }

  function getDateObjFromString(week) {
    let date = week.match(/\b(\w+)\b/g);
    let currentWeek = new Date(
      parseInt(date[0]),
      date[1] - 1,
      parseInt(date[2])
    );
    return currentWeek;
  }

  return (
    <div>
        <div className="centerSearch">
        <div className="centerSearch2">
          <label for="week">Search Week</label>
          <div />
          <input
            onChange={(e) => changeWeek(e.target.value)}
            type="week"
            name="week"
            id="camp-week"
            min="2000"
            required
          ></input>
          <div className="weekdate">{getWeekRange(weekString)}</div>
        </div>
      </div>
      <div />
      <div className="week">{displayCards}</div>
    </div>
  );
}

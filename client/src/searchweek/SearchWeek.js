import "./SearchWeek.css";
import Navbar from "../navbar/Navbar";
import DayColumn from "../home/DayColumn";
import CarpoolChip from "../home/CarpoolChip";
import React from "react";
import axios from "axios";
import moment from "moment";

export default function SearchWeek() {
    const [weekString, setWeekString] = React.useState("2022-11-01")
    const [displayCards, setDisplayCards] = React.useState("blah blach")


    React.useEffect(() => {
        axios.get(`/api/practice/${weekString}`).then((resp) => {
            console.log(resp.data);
        })
    }, [weekString])

    function changeWeek(week) {
        let date = week.match(/\b(\w+)\b/g);
        date[1] = parseInt(date[1].substr(1))
        console.log(date)
        let currentWeek = (new Date(2022, 0, (date[1] - 1 ) * 7 + 3))
        let currWeekString = `${currentWeek.getFullYear()}-${currentWeek.getMonth() + 1}-${currentWeek.getDate()}`
        setWeekString(currWeekString);
        console.log(currWeekString)
    }

    return (
        <div>
            <Navbar />
            <label for="week">Search Week</label>
            <input onChange={(e)=>changeWeek(e.target.value)}type="week" name="week" id="camp-week" min="2000" required></input>
            <div/>
            {displayCards}
        </div>
    )
}
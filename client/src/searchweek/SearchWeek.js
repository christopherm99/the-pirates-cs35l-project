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
            
            var dayArr = [];
            var days = resp.data
            for (var key in days) {
                if (days.hasOwnProperty(key)) {
                    dayArr.push( [ key, days[key] ] );
                }
            }

            let newCards = dayArr.map(item => {
                const [key, value] = item;
                const firstDayOfCurrentWeek =  moment(getDateObjFromString(weekString)).startOf('week');
                
                
                console.log("first day:" );
                console.log(firstDayOfCurrentWeek);
                let today = null;
                if (key === "Tuesday") {
                today = firstDayOfCurrentWeek.add(2, 'days');
                } else if (key === "Wednesday") {
                today = firstDayOfCurrentWeek.add(3, 'days');
                } else if (key === "Thursday") {
                today = firstDayOfCurrentWeek.add(4, 'days');
                } else if (key === "Friday") {
                today = firstDayOfCurrentWeek.add(5, 'days');
                } else if (key === "Monday") {
                today = firstDayOfCurrentWeek.add(1, 'days');
                }
                
                return (
                <DayColumn 
                    dateString={today.format("YYYY-MM-DD")}
                    carsLeaving={value}
                />
                )
            })

            if(newCards.length == 0) {
                newCards = <div className="warning">⚠️☹️ No Rides this Week ☹️⚠️</div>
            }
            setDisplayCards(newCards)
        })
    }, [weekString])

    function changeWeek(week) {
        let date = week.match(/\b(\w+)\b/g);
        date[1] = parseInt(date[1].substr(1))
        let currentWeek = (new Date(date[0], 0, (date[1] - 1 ) * 7 + 3));
        let currWeekString = `${currentWeek.getFullYear()}-${currentWeek.getMonth() + 1}-${currentWeek.getDate()}`
        setWeekString(currWeekString);
        getWeekRange(week);
    }

    function getWeekRange(week){
        let currentWeek = getDateObjFromString(week);
        return `${currentWeek.toDateString()} `;
    }

    function getDateObjFromString(week) {
        let date = week.match(/\b(\w+)\b/g);
        let currentWeek = (new Date(parseInt(date[0]), date[1] - 1, parseInt(date[2])));
        return currentWeek;
    }

    return (
        <div>
            <div className="centerSearch">
                <div className="centerSearch2">
                    <label for="week">Search Week</label>
                    <div/>
                    <input onChange={(e)=>changeWeek(e.target.value)}type="week" name="week" id="camp-week" min="2000" required></input>
                    <div className="weekdate">
                        { getWeekRange(weekString)}
                    </div>
                </div>
            </div>
            <div/>
            <div className="week">
                {(displayCards)}
            </div>
            
        </div>
    )
}
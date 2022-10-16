import React from "react"
import Carpool from "./Carpool"
export default function Day(props) {
    return(
        <div className="day">
            <div className="day-date">
                <div className="date-num">10</div>
                <div className="week-day">sunday</div>
            </div>
            <div className="carpools">
                <Carpool />
                <Carpool />
            </div>
        </div>
    )
}
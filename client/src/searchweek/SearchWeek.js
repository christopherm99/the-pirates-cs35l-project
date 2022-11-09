import "./SearchWeek.css";
import Navbar from "../navbar/Navbar";
import DayColumn from "../home/DayColumn";
import React from "react";
import axios from "axios";
import moment from "moment";

export default function SearchWeek() {
    return (
        <div>
            <Navbar searchMembers/>
            <label for="week">Search Week</label>

            <input type="week" name="week" id="camp-week" min="2000" required></input>
        </div>
    )
}
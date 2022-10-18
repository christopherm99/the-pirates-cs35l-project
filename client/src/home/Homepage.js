import "./Homepage.css";
import DayColumn from "./DayColumn.js";
import Navbar from "../navbar/Navbar";
import axios from "axios";

export default function Homepage() {
  const days = {
    Tuesday: [	
      {
        driver: {
            name: "Eric Wu",
            pfp_id: 2940230,
            uid: 45678900
        },
        depart_time: "2:10",
        passengers: [
          {
           name: "Christopher Milan",
            pfp_id: 456789,
            uid:13989
          },
          {
            name: "Michael Bunte",
             pfp_id: 5738,
             uid:175948
           },
           {
            name: "Cool Dawg",
             pfp_id: 389,
             uid:390
           }
        ]
      },
    ],
    Wednesday: [
      {
        driver: {
            name: "Jackson Spendy",
            pfp_id: 12342,
            uid: 3456
        },
        depart_time: "2:10",
        passengers: [
          {
           name: "Milan Chris",
            pfp_id: 567856,
            uid:123
          },
          {
            name: "yeah",
             pfp_id: 34563563,
             uid:568374263152
           },
           {
            name: "lol",
             pfp_id: 23457245,
             uid:247
           }
        ]
      }
    ]
  }

var dayArr = [];
for (var key in days) {
    if (days.hasOwnProperty(key)) {
        dayArr.push( [ key, days[key] ] );
    }
}
// console.log(dayArr);

  const cards = dayArr.map(item => {
    return (
      <DayColumn 
        dateString={"2022-10-16"}
        carsLeaving={item[1]}
      />
    )
  })


  
  return (
    <>
      <Navbar searchWeekButton submitFormButton loginButton/>
      <div className="week">
        {cards}
      </div>
    </>
  )
}
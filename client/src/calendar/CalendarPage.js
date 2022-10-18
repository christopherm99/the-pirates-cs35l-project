import "./CalendarPage.css";
import Navbar from "../navbar/Navbar";

export default function CalendarPage() {
  // This is the page where we will allow users to search through past data
  // This page should first check if the user is authenticated or not,
  // and if the user is not logged in, we should either show an error or redirect them to the home page.
  return (
    <>
      <Navbar returnHomeButton submitFormButton loginButton/>
      <div>
        Hello world, this is about to be the calendar page.
      </div>
    </>
  )
}

import "./Form.css";
import Navbar from "../navbar/Navbar";

export default function CalendarPage() {
  // This is the page where users will submit the form weekly to give their availability for carpooling.
  // This page should first check if the user is authenticated or not,
  // and if the user is not logged in, we should either show an error or redirect them to the home page.

  return (
    <>
      <Navbar returnHomeButton loginButton/>
      <div>
        Hello world, this is about to be the form where you submit your availability for the upcoming week.
      </div>
    </>
  )
}

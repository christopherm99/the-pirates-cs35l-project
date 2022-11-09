import "./CalendarPage.css";
import Navbar from "../navbar/Navbar";
import SearchMembers from "../search_members/SearchMembers";
import Search from "../search_members/Search";

export default function CalendarPage() {
  // This is the page where we will allow users to search through past data
  // This page should first check if the user is authenticated or not,
  // and if the user is not logged in, we should either show an error or redirect them to the home page.
  return (
    <>
      <Navbar returnHomeButton submitFormButton loginButton searchMembers/>
      <div>
        <SearchMembers />
      </div>
    </>
  )
}

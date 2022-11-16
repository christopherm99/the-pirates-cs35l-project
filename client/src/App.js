import "./App.css";
import Homepage from "./home/Homepage";
import CalendarPage from "./calendar/CalendarPage";
import Form from "./form/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchWeek from "./searchweek/SearchWeek";
import Navbar from "./navbar/Navbar";
import Profile from "./profile/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/submitform" element={<Form />} />
          <Route path="/search-members" element={<CalendarPage />} />
          <Route path="/search-weeks" element={<SearchWeek />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

function NotFound() {
  window.location.href = "https://linux.ucla.edu/notfound";
}

export default App;

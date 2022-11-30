import "./App.css";
import Homepage from "./home/Homepage";
import SearchUsers from "./search_members/SearchUsers"
import Form from "./form/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchWeek from "./searchweek/SearchWeek";
import Navbar from "./navbar/Navbar";
import Profile from "./profile/Profile";
import Wave from 'react-wavify'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/submitform" element={<Form />} />
          <Route path="/search-members" element={<SearchUsers />} />
          <Route path="/search-weeks" element={<SearchWeek />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
      <Wave fill="url(#gradient)" speed="0.3">
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%"  stopColor="#5EC3D9" />
            <stop offset="90%" stopColor="#466582" />
          </linearGradient>
        </defs>
      </Wave>
    </div>
  );
}

export default App;

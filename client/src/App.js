import './App.css';
import Homepage from './home/Homepage';
import CalendarPage from './calendar/CalendarPage';
import Form from './form/Form'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchWeek from './searchweek/SearchWeek';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* These are other pages we will implement in the future */}
          <Route path="/submitform" element={<Form />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/search-weeks" element={<SearchWeek />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

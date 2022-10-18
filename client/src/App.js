import './App.css';
import Homepage from './home/Homepage';
import CalendarPage from './calendar/CalendarPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* These are other pages we will implement in the future */}
          {/* <Route path="/submitform" element={<Form />} /> */}
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

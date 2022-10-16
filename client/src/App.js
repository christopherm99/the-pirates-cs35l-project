import logo from './logo.svg';
import Day from './Day.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <div className="nav--months">January 2022</div>
        <a className="form-button">sign up</a>
        <a className="form-button">search week</a>
      </div>
      <div className="week">
        <Day/>
        <Day/>
        <Day/>
        <Day/>
        <Day/>
        <Day/>
        <Day/>
      </div>
    </div>
  );
}

export default App;

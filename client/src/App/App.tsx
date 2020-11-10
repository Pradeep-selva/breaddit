import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className='App'>
      <Router>
        <header className='App-header'>
          <p>BREADDIT</p>
        </header>
      </Router>
    </div>
  );
};

export default App;

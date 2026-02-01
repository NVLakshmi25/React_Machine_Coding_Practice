import React from "react";
import './App.css'
import ProgressBar from "./Components/ProgressBar";

function App() {
  const bars = [5, 15, 22, 30, 50, 70, 90, 100];

  return (
    <div className="progress-container">
      <h1 className="headline"> PROGRESS BAR</h1>
      {bars.map((value) => (
        <ProgressBar key={value} progress={value} />
      ))}
    </div>
  );
}

export default App;

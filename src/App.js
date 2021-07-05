import React, { useState } from "react";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  const [background, setBackground] = useState("#31a8ff");

  return (
    <div className="App">
      <div className="App-header" style={{ backgroundColor: background }}>
        <WeatherInfo color={setBackground} />
      </div>
    </div>
  );
}

export default App;

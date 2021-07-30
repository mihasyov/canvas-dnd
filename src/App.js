import React from "react";

import Figures from "./components/Figures";
import Canvas from "./components/Canvas";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="stage">
        <Figures />
        <Canvas />
      </div>
    </div>
  );
};

export default App;

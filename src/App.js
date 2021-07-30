import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import Figures from "./components/Figures";
import Canvas from "./components/Canvas";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="stage">
          <Figures />
          <Canvas />
        </div>
      </div>
    </Provider>
  );
};

export default App;

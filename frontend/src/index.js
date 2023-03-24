import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { workoutsContextProvider } from "./context/workoutContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <workoutsContextProvider>
      <App />
    </workoutsContextProvider>
  </React.StrictMode>
);

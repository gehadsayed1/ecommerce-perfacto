import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/components/button.css";
import "./css/components/alert.css";
import "./pages/Auth/auth.css";
import "./pages/Auth/error403.css"
import "./pages/Auth/Error404.css"

import "./components/laoding/laoding.css"
import "bootstrap/dist/css/bootstrap.min.css";
 import 'react-loading-skeleton/dist/skeleton.css'
import MinuContext from "./context/MinuContext";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import WindoContext from "./context/WindoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindoContext>
    <MinuContext>
      <Router>
        <App />
      </Router>
    </MinuContext>
    </WindoContext>
  </React.StrictMode>
);

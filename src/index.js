import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { AuthController } from "./auth/Auth";
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthController>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthController>
  </React.StrictMode>,
  document.getElementById("root")
);

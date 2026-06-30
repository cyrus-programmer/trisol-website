import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// BASE_URL comes from vite.config.js's `base` option (e.g. "/trisol-website/").
// Passing it as the router's basename keeps every <Link to="/"> and useLocation()
// call aligned with however the app is actually being served — locally at "/",
// or on GitHub Pages at "/trisol-website/" — without hardcoding paths anywhere else.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

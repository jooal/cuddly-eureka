import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NewTopic } from "./routes/NewTopic";
import { Profile } from "./routes/Profile";
import { Details } from "./routes/Details";

const root = ReactDOM.createRoot(document.getElementById("root"));
const threadId = 123;
root.render(
  <Router>
    <React.Fragment>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/new" element={<NewTopic />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={`/${threadId}`} element={<Details />} />
      </Routes>
    </React.Fragment>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

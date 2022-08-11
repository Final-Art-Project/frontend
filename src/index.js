import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import { Header } from "./components/Header";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "./index.css";

// import "./reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="upload" element={<Upload />} />
      <Route path="header" element={<Header />} />
      {/* <Route path="sliderData" element={<SliderData />} /> */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

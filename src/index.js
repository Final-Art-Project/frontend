import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
// import Download from "./components/Download";
import ImageSlider from "./components/ImageSlider";
import App from "./App";

// import { SliderData } from "./components/SliderData";
//import "./reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="upload" element={<Upload />} />
      {/* <Route path="download" element={<Download />} /> */}
      <Route path="imageSlider" element={<ImageSlider />} />
      {/* <Route path="sliderData" element={<SliderData />} /> */}
    </Routes>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import ImageSlider from "./components/ImageSlider";
// import { SliderData } from "./components/SliderData";
import "./reset.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="upload" element={<Upload />} />
      <Route path="imageSlider" element={<ImageSlider />} />
      {/* <Route path="sliderData" element={<SliderData />} /> */}
    </Routes>
  </BrowserRouter>
);

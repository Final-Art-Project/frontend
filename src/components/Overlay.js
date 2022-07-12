import React from "react";
import "./Overlay.css";

export default function Overlay({ image, visible }) {
  return (
    <div
      className="overlay"
      style={{
        display: visible ? "block" : "none",
      }}
    >
      <img src={image} />
      Overlay
      {image}
      image:
    </div>
  );
}

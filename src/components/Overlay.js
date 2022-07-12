import React from "react";
import "./Overlay.css";

export default function Overlay({ image, visible, onClose }) {
  return (
    <div
      className="overlay"
      style={{
        display: visible ? "block" : "none",
      }}
    >
      <div
        className="close"
        onClick={() => {
          onClose();
        }}
      >
        X
      </div>
      <img src={image} />
    </div>
  );
}

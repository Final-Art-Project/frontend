import React from "react";
import "./Overlay.css";
import { saveAs } from "file-saver";
// import { IconName } from "react-icons/fa";

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
      <button
        className="download"
        onClick={() => {
          const splitUrl = image.split("/");
          const imageName = splitUrl[splitUrl.length - 1];
          saveAs(image, imageName);
        }}
      >
        Download
      </button>

      <img src={image} alt="bild" />
    </div>
  );
}

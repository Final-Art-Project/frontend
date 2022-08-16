import React from "react";
import "./Overlay.css";
import { FaArrowDown } from "react-icons/fa";
import FileSaver from "file-saver";
// import { IconName } from "react-icons/fa";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Overlay({ image, visible, onClose, onDelete }) {
  const handleFromDelete = async () => {
    onDelete(image.public_id);
  };
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
          const splitUrl = image?.url.split("/");
          const imageName = splitUrl[splitUrl.length - 1];
          FileSaver.saveAs(image?.url, imageName);
        }}
      >
        <FaArrowDown />
      </button>
      <button className="delete" onClick={handleFromDelete}>
        Delete
      </button>
      <img src={image?.url} alt="bild" />
    </div>
  );
}

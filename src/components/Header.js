import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header>
      <img src="./logo.png" className="App-logo" alt="logo" />

      <ul
        className="nav"
        style={{ display: showMobileNav ? "none" : undefined }}
      >
<<<<<<< HEAD
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="upload">Upload</Link>{" "}
        </li>
        <li>
          <Link to="imageSlider">ImageSlider</Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="sliderData">SliderData</Link>
        </li>
=======
        <Link to="upload">Upload</Link> {" "}
        <Link to="imageSlider">ImageSlider</Link> {" "}
        <Link to="sliderData">SliderData</Link> 
>>>>>>> Mohal
      </ul>

      <button
        className="btnMobileMenu"
        onClick={() => {
          setShowMobileNav(!showMobileNav);
        }}
      >
        =
      </button>
    </header>
  );
};

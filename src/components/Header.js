import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header>
      <img className="App-logo" src="./logo.png"  alt="logo" />

      <ul
        className="nav"
        style={{ display: showMobileNav ? "none" : undefined }}
      >
        {/* <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        ></nav> */}
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
      </ul>

      <button
        className="btnMobileMenu"
        onClick={() => {
          setShowMobileNav(!showMobileNav);
        }}
      ></button>
    </header>
  );
};

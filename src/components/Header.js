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
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="upload">Upload</Link>{" "}
        </li>
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

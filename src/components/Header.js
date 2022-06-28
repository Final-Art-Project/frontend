import { useState } from "react";

import "./Header.css";

export const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header>
      <figure className="logo">Art</figure>
      <ul
        className="nav"
        style={{ display: showMobileNav ? "none" : undefined }}
      >
        <li></li>
        <li>
          <a href="/">Art1</a>
        </li>
        <li>
          <a href="/">Art2</a>
        </li>
        <li>
          <a href="/">Art3</a>
        </li>
        <li>
          <a href="/">Art4</a>
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

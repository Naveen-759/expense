import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalState";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = useGlobal();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Expense Tracker</h1>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {/* <Link to="/home">Home</Link> */}
        {isLoggedIn ? (
          <Link to="/logout" className="cta-button">
            Logout
          </Link>
        ) : (
          <Link to="/signup" className="cta-button">
            Signup
          </Link>
        )}
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Header;

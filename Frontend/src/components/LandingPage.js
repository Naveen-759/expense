import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const SimpleLandingPage = () => {
  return (
    <div className="simple-landing-page">
      <Link to="/signup">
        <div className="lpdesign">₹</div>
      </Link>
      <div className="lptext">List your transaction here and export as pdf</div>
    </div>
  );
};

export default SimpleLandingPage;

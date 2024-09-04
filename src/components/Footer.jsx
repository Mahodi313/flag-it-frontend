import React from "react";

// Router Link
import { Link, useLocation } from "react-router-dom";

// Images
import flagit_logo from "@images/flagit_logo.png";

function Footer() {
  return (
    <>
      <div id="footer-container">
        <Link id="footer-left-container" to="/">
          <div id="footer-left-left">
            <img className="logo-image" src={flagit_logo} alt="Bild på logo" />
          </div>
          <div id="footer-left-right">
            <h3>Flagit</h3>
            <p>Put a flag on it!</p>
          </div>
        </Link>

        <div id="footer-right-container">
          <Link className="nav-menu-current" to="/">
            Hem
          </Link>
          <Link className="nav-menu-current" to="/world">
            Världens Flaggor
          </Link>
          <Link className="nav-menu-current" to="/quizstart">
            Quiz
          </Link>
          <Link className="nav-menu-current" to="/leaderboard">
            Leaderboard
          </Link>
        </div>
      </div>
    </>
  );
}

export default Footer;

import React from "react";

// Router Link
import { Link, useLocation } from "react-router-dom";

function Footer() {
  return (
    <>
      <div id="footer-container">
        <div id="footer-left-container">
          <h3>Flagit</h3>
          <p>Put a flag on it!</p>
        </div>
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

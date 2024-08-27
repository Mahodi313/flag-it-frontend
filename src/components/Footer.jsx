import React from "react";

// Router Link
import { Link, useLocation } from "react-router-dom";

function Footer() {
  return (
    <>
      <div id="footer-container">
        <div>
          <h3>Flagit</h3>
          <h5>Put a flag on it!</h5>
        </div>
        <div>
          <h1>Hem</h1>
          <h1>Världens Flaggor</h1>
          <h1>Quiz</h1>
          <h1>Leaderboard</h1>
        </div>
      </div>
    </>
  );
}

export default Footer;

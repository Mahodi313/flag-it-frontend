import React, { useContext } from "react";
import { AuthContext } from "../Contexts/auth.context";

// Router Link
import { Link, useLocation } from "react-router-dom";

// Images
import flagit_logo from "@images/flagit_logo.png";

function Footer() {
  const { user, signOut } = useContext(AuthContext);
  const location = useLocation();

  const isQuizPage = [
    "/quiz/easy",
    "/quiz/Easy",
    "/quiz/normal",
    "/quiz/Normal",
    "/quiz/hard",
    "/quiz/Hard",
  ].includes(location.pathname);

  return (
    <>
      <div id="footer-container">
        <div id="footer-left-container">
          <div id="footer-left-left">
            <img className="logo-image" src={flagit_logo} alt="Bild på logo" />
          </div>
          <div id="footer-left-right">
            <h3>Flagit</h3>
            <p>Put a flag on it!</p>
          </div>
        </div>

        {!isQuizPage && (
          <div id="footer-right-container">
            <Link className="nav-menu-current" to="/">
              Hem
            </Link>
            <Link className="nav-menu-current" to="/world">
              Världens Flaggor
            </Link>
            <Link
              className="nav-menu-current"
              to={user ? "/quizstart" : "/login"}
            >
              Quiz
            </Link>
            <Link className="nav-menu-current" to="/leaderboard">
              Leaderboard
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Footer;

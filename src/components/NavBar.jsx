import React, { useContext } from "react";
import { AuthContext } from "../Contexts/auth.context";

// Router Link
import { Link, useLocation } from "react-router-dom";

// Images
import flagit_logo from "@images/flagit_logo.png";

function NavBar() {
  const location = useLocation();
  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <div id="nav-container">
        <Link id="nav-left" to="/">
          <img className="logo-image" src={flagit_logo} alt="Bild på logo" />
          <h2 className="logo-name">Flagit</h2>
        </Link>
        <div id="nav-middle">
          <Link
            className={
              location.pathname === "/" ? "nav-menu-current" : "nav-menu-size"
            }
            to="/"
          >
            Hem
          </Link>
          <Link
            className={
              location.pathname === "/world"
                ? "nav-menu-current"
                : "nav-menu-size"
            }
            to="/world"
          >
            Världens Flaggor
          </Link>
          <Link
            className={
              location.pathname === "/quizstart"
                ? "nav-menu-current"
                : "nav-menu-size"
            }
            to="/quizstart"
          >
            Quiz
          </Link>
          <Link
            className={
              location.pathname === "/leaderboard"
                ? "nav-menu-current"
                : "nav-menu-size"
            }
            to="/leaderboard"
          >
            Leaderboard
          </Link>
        </div>
        <div id="nav-right">
          <>
            {user ? (
              <Link
                className="nav-link logoutLink nav-menu-size"
                to="#"
                onClick={() => signOut()}
              >
                Logga ut
              </Link>
            ) : (
              <>
                <Link
                  id="loginLink"
                  className={
                    location.pathname === "/login"
                      ? "nav-menu-current"
                      : "nav-menu-size"
                  }
                  to="/login"
                >
                  Logga in
                </Link>
                <Link
                  id="RegisterLink"
                  className={
                    location.pathname === "/register"
                      ? "nav-menu-current"
                      : "nav-menu-size"
                  }
                  to="/register"
                >
                  Registrera
                </Link>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default NavBar;

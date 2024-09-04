import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/auth.context";

// Router Link
import { Link, useLocation } from "react-router-dom";

// Images
import flagit_logo from "@images/flagit_logo.png";

function NavBar() {
  const location = useLocation();
  const { user, signOut } = useContext(AuthContext);
  const [showDeskNav, setShowDeskNav] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowDeskNav(false);
      } else {
        setShowDeskNav(true);
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Mobil navigering */}
      {!showDeskNav ? (
        <div className="mobile-nav">
          <Link id="nav-left" to="/">
            <img className="logo-image" src={flagit_logo} alt="Flagit Logo" />
            <h2 className="logo-name">Flagit</h2>
          </Link>
          <button
            className={`hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={toggleMenu}
          >
            <div className="bar"></div>
          </button>
        </div>
      ) : (
        /* Desktop-navigering */
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
              to={user ? "/quizstart" : "/login"}
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
      )}

      {/* Mobilmeny */}
      {menuOpen && !showDeskNav && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link
            className="mobile-nav-item"
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Hem
          </Link>
          <Link
            className="mobile-nav-item"
            to="/world"
            onClick={() => setMenuOpen(false)}
          >
            Världens Flaggor
          </Link>
          <Link
            className="mobile-nav-item"
            to={user ? "/quizstart" : "/login"}
            onClick={() => setMenuOpen(false)}
          >
            Quiz
          </Link>
          <Link
            className="mobile-nav-item"
            to="/leaderboard"
            onClick={() => setMenuOpen(false)}
          >
            Leaderboard
          </Link>
          {user ? (
            <Link
              className="mobile-nav-item"
              to="#"
              onClick={() => {
                signOut();
                setMenuOpen(false);
              }}
            >
              Logga ut
            </Link>
          ) : (
            <>
              <Link
                className="mobile-nav-item"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Logga in
              </Link>
              <Link
                className="mobile-nav-item"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Registrera
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default NavBar;

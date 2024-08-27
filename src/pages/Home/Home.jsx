import React from "react";

// Router Link
import { Link } from "react-router-dom";

// CSS & Font Awesome
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faGlasses, faPen } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <>
      <div id="landing-container-top">
        <div id="landing-left">
          <h1>FLAGIT</h1>
          <h3>Put a flag on it!</h3>
          <Link to="/quizstart">
            <button className="primary-btn">Gå till Quiz</button>
          </Link>
        </div>
        <div id="landing-right">
          <p>
            Med Flagit blir det lättar att lära sig mer om världens olika
            flaggor. Du lär dig särskilja dem på ett roligt sätt, så att du
            aldrig har tråkigt!
          </p>
        </div>
      </div>
      <div id="landing-container-bottom">
        <div className="landing-box">
          <h2>01</h2>
          <p>Perfekt för alla åldrar.</p>
        </div>
        <div className="landing-box">
          <h2>02</h2>
          <p>Lär dig flaggor snabbt och enkelt.</p>
        </div>
        <div id="landing-box-3" className="landing-box">
          <h2>03</h2>
          <p>Utveckla ditt geografiska sinne på ett roligt sätt!</p>
        </div>
      </div>
    </>
  );
}

export default Home;

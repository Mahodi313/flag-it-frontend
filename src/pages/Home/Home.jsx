import React from "react";

// Router Link
import { Link } from "react-router-dom";

import "./Home.css";

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
          <ul>
            <li>Information om hur man använder sidan</li>
            <li>Quiz för att utmana dig själv och andra på hemsidan</li>
            <li>Se din historik och utveckla din kunskap</li>
          </ul>
        </div>
      </div>
      <div id="landing-container-bottom">
        <div className="landing-box">
          <h2>01</h2>
          <p>Säljande punkt</p>
        </div>
        <div className="landing-box">
          <h2>02</h2>
          <p>Säljande punkt</p>
        </div>
        <div id="landing-box-3" className="landing-box">
          <h2>03</h2>
          <p>Säljande punkt</p>
        </div>
      </div>
    </>
  );
}

export default Home;

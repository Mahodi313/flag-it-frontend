import React from "react";

import "./Home.css";

function Home() {
  return (
    <>
      <div>
        <div>
          <h1>FLAGIT</h1>
          <h3>Put a flag on it!</h3>
          <button>Gå till Quiz</button>
        </div>
        <ul>
          <li>Information om hur man använder sidan</li>
          <li>Quiz för att utmana dig själv och andra på hemsidan</li>
          <li>Se din historik och utveckla din kunskap</li>
        </ul>
      </div>
      <div>
        <div>
          <p>01</p>
          <p>Säljande punkt</p>
        </div>
        <div>
          <p>02</p>
          <p>Säljande punkt</p>
        </div>
        <div>
          <p>03</p>
          <p>Säljande punkt</p>
        </div>
      </div>
    </>
  );
}

export default Home;

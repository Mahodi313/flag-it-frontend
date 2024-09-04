import React, { useState, useEffect, useContext } from "react";

// CSS & Font Awesome
import "./Quiz.css";

import leaderboardImage from "@images/leaderboard_box.png";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index för nuvarande fråga
  const [time, setTime] = useState(0); // Tid i sekunder
  const [isActive, setIsActive] = useState(true); // Timer status

  // Starta och uppdatera timern när sidan laddas
  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Uppdatera varje sekund
    }

    return () => clearInterval(timer); // Rensa timern när komponenten avmonteras
  }, [isActive]);

  // Hämta frågorna från API när sidan laddas
  useEffect(() => {
    fetch("https://localhost:7007/api/Question/GetByDifficulty/hard")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  // Hantera nästa fråga
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsActive(false); // Pausa timern när sista frågan är besvarad
      alert(`Quizet är slut! Du tog ${time} sekunder.`);
    }
  };

  // Konvertera tid till minuter och sekunder
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      <div id="quiz-container-top">
        <div id="dummy-container-1" />
        <div id="quiz-title-container">
          <h1>Quizet har startat!</h1>
          <h2>Svårighetsnivå: Svår</h2>
        </div>
        <div id="quiz-timer-container">Tid: {formatTime(time)}</div>
      </div>
      <div id="quiz-container-bottom">
        <img src="" alt="Bild på flagga" />
        <h1>Vilket land tillhör denna flagga?</h1>
        <ul>
          <li>Sant</li>
          <li>falskt</li>
          <li>falskt</li>
        </ul>
        <button className="primary-btn">Nästa</button>
        <div id="dummy-container-2" />
      </div>
    </>
  );
}

export default Quiz;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/auth.context";
import "./QuizStart.css";

function QuizStart() {
  const [difficulty, setDifficulty] = useState("Lätt");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleStartQuiz = () => {
    if (!user) {
      navigate("/login");
    } else {
      const difficultyTranslated = handleTranslateLevel(difficulty);
      navigate(`/quiz/${difficultyTranslated}`);
    }
  };

  const handleTranslateLevel = (level) => {
    switch (level) {
      case "Lätt":
        return "easy";
      case "Mellan":
        return "normal";
      case "Svår":
        return "hard";
      default:
        return "easy";
    }
  };

  return (
    <div className="quiz-start">
      <h1>Välkommen till Quizet!</h1>
      <p>Här kommer information om quizet att synas.</p>
      <p id="second-p">Det här är vad du behöver tänka på:</p>
      <ul>
        <li>
          Quizet består av 15 frågor att besvara samt ett val av
          svårighetsgrader.
        </li>
        <li>Du har en obegränsad mängd tid att slutföra varje quiz.</li>
        <li>
          Däremot bör du försöka svara så snabbt och korrekt som möjligt, då
          både tid och antal korrekta svar räknas in i ditt slutliga resultat.
        </li>
        <li>Varje korrekta svar ger dig ett poäng.</li>
        <li>
          I slutet av quizet får du se hur många korrekta svar du fick och sedan
          sparas ditt resultat i en Leaderboard där du får se ditt resultat och
          andra användares resultat.
        </li>
        <li>
          Resultatet sparas även i din profilhistorik, under Min Profil, så att
          du kan se ditt resultat.
        </li>
        <li>Slutligen, lycka till och ha kul!</li>
      </ul>
      <p>Välj svårighetsgrad och tryck på "Start Quiz" för att börja.</p>
      <form>
        <label>
          <input
            type="radio"
            value="Lätt"
            checked={difficulty === "Lätt"}
            onChange={handleDifficultyChange}
          />
          Lätt
        </label>
        <label>
          <input
            type="radio"
            value="Mellan"
            checked={difficulty === "Mellan"}
            onChange={handleDifficultyChange}
          />
          Mellan
        </label>
        <label>
          <input
            type="radio"
            value="Svår"
            checked={difficulty === "Svår"}
            onChange={handleDifficultyChange}
          />
          Svår
        </label>
      </form>
      <button className="primary-btn" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default QuizStart;

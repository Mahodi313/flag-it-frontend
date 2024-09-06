import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/auth.context";
import "./QuizStart.css";

function QuizStart() {
  const [difficulty, setDifficulty] = useState("Lätt");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // const isLoggedIn = () => {
  //   // Kontrollera om användaren är inloggad genom att kontrollera om authToken finns i localStorage
  //   return localStorage.getItem("authToken") !== null;
  // };

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

  const handleTranslateLevel =(level) => {
    switch (level) {
      case "Lätt":
        return "easy";
      case "Mellan":
        return "normal";
      case "Svår":
        return "hard";
      default:
        return "easy";
  };
}


  return (
    <div className="quiz-start">
      <h1>Välkommen till Quizet!</h1>
      <p>
        Här kommer information om quizet att synas och lite information om en
        timer, vad man ska tänka på, och ett lycka till.
      </p>
      <ul>
        <li>Quizet består av flera frågor med olika svårighetsgrader.</li>
        <li>Du har en begränsad tid att slutföra varje quiz.</li>
        <li>Försök att svara så snabbt och korrekt som möjligt, då både tid och antal korrekta svar räknas in i ditt slutliga resultat.</li>
        <li>Varje korrekt svar ger dig ett poäng.</li>
        <li>I slutet av quizet får du se hur många korrekta svar du fick och även chansen att spara ditt resultat i en Leaderboard där du får se ditt resultat och andra användares resultat.</li>
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
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}

export default QuizStart;
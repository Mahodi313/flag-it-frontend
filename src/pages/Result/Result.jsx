import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// CSS & Font Awesome
import "./Result.css";

function Result() {
  const [quizData, setQuizData] = useState({ quizResults: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuizData = localStorage.getItem("quizData");

    if (!storedQuizData) {
      // If no flag, redirect to quizstart
      navigate("/quizstart");
    }
    if (storedQuizData) {
      const quizLocalData = JSON.parse(storedQuizData);
      setQuizData(quizLocalData);
    }
  }, [navigate]);

  const quizTimeInSeconds = Math.floor(quizData.quizTime / 1000);
  const minutes = Math.floor(quizTimeInSeconds / 60);
  const seconds = quizTimeInSeconds % 60;

  return (
    <div className="result-page">
      <h2>Resultat</h2>

      <div className="result-content">
        <table className="result-table">
          <thead>
            <tr>
              <th>Flagga</th>
              <th>Ditt resultat</th>
              <th>Korrekt svar</th>
            </tr>
          </thead>
          <tbody>
            {quizData.quizResults?.map((result, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="flagImg"
                    src={result.questionFlag}
                    alt={`Bild på ${result.correctAnswer}`}
                  />
                </td>
                <td>{result.userAnswer}</td>
                <td>{result.correctAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="result-details">
          <p>Datum: {new Date(quizData.quizDate).toLocaleString()}</p>

          <p>Poäng: {quizData.quizPoints}/15</p>
          <p>
            Tid: {minutes} minuter och {seconds} sekunder
          </p>

          <Link to={"/leaderboard"} className="btn">
            Leaderboard
          </Link>
          <Link to={"/quizstart"} className="btn">
            Spela igen
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;

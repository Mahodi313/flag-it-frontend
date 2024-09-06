import { Link } from "react-router-dom";

// CSS & Font Awesome
import "./Result.css";

function Result() {
  const result = [
    {
      flag: "Nigeria",
      userAnswer: "Nigeria",
      correctAnswer: "Sverige",
    },
    {
      flag: "Nigeria",
      userAnswer: "Nigeria",
      correctAnswer: "Sverige",
    },
    { flag: "Nigeria", userAnswer: "Nigeria", correctAnswer: "Sverige" },
  ];
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
            {result.map((result, index) => (
              <tr key={index}>
                <td>
                  <div className="flag">{result.flag}</div>
                </td>
                <td>{result.correctAnswer}</td>
                <td>{result.userAnswer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="result-details">
          <p>Datum: 2024-9-05 kl 15:00</p>
          <p>Rank: #12</p>
          <p>Poäng: 16/20</p>
          <p>Tid: 60 Sekunder</p>
          <Link to={"/leaderboard"} className="btn">
            Se Leaderboard
          </Link>
          <Link to={"/quizstart"} className="btn">
            Gör quiz igen
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Result;

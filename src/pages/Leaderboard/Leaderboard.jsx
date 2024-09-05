import React, {useEffect, useState} from "react";

// CSS & Font Awesome
import "./Leaderboard.css";
import leaderboard_triangle from "@images/Leaderboard_triangle.svg";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Hard');

  useEffect(() => {
    fetch('https://localhost:7007/api/Result')
      .then((response) => response.json())
      .then(data => setLeaderboardData(data))
      .catch((error) => console.error('Error fetching leaderboard data:', error));
  }, []);

  const handleDifficultyClick = (selectedDifficulty) => {
    setSelectedDifficulty(selectedDifficulty);
    console.log(`Selected difficulty: ${selectedDifficulty}`);
  };

  const filteredData = leaderboardData.filter(entry => entry.difficulty === selectedDifficulty);

  return (
    <>
      <div className="leaderboardCont">
        <div className="topDiv">
          <h1 className="leaderboardH1">Leaderboard</h1>
          {/* <div className="triangle"></div> */}
          <div className="difficultyDiv">
            <button onClick={() => handleDifficultyClick('Easy')}><h3>Lätt</h3></button>
            <button onClick={() => handleDifficultyClick('Medium')}><h3>Mellan</h3></button>
            <button onClick={() => handleDifficultyClick('Hard')}><h3>Svår</h3></button>
          </div>
        </div>
        <div className="leaderboard-box">
          <table className="leaderboardTable">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Användare</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Poäng</th>
              </tr>
            </thead>
            <tbody>
            {filteredData
              .sort((a, b) => {
                if (b.points === a.points) {
                  return a.timeOfCompletion - b.timeOfCompletion; 
                }
                return b.points - a.points; 
              })
              .slice(0, 10)
              .map((entry, index) => {
              const date = new Date(entry.dateOfResult);
              const formattedDate = date.toLocaleDateString();
              return (
                <tr key={index}>
                  <td>{index +1}</td>
                  <td>{entry.userName}</td>
                  <td>{formattedDate}</td>
                  <td>{entry.timeOfCompletion}</td>
                  <td>{entry.points}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;

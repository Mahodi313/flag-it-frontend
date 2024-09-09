import React, {useEffect, useState} from "react";

// CSS & Font Awesome
import "./Leaderboard.css";
import leaderboard_triangle from "@images/Leaderboard_triangle.svg";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Hard');

  // Fetch leaderboard data from the API
  useEffect(() => {
    fetch('https://localhost:7007/api/Result')
      .then((response) => response.json())
      .then(data => setLeaderboardData(data))
      .catch((error) => console.error('Error fetching leaderboard data:', error));
  }, []);

  // Function to handle the difficulty buttons
  const handleDifficultyClick = (selectedDifficulty) => {
    setSelectedDifficulty(selectedDifficulty);
    console.log(`Selected difficulty: ${selectedDifficulty}`);
  };

  // Filter the leaderboard data based on the selected difficulty
  const filteredData = leaderboardData.filter(entry => entry.difficulty === selectedDifficulty);

  return (
    <>
      <div className="leaderboardCont">
        <div className="topDiv">
          <h1 className="leaderboardH1">Leaderboard</h1>
          <h2 className="difficultyH2">{selectedDifficulty}</h2>
          <div className="difficultyDiv">
            <button onClick={() => handleDifficultyClick('Easy')}><h3>Lätt</h3></button>
            <button onClick={() => handleDifficultyClick('Normal')}><h3>Mellan</h3></button>
            <button onClick={() => handleDifficultyClick('Hard')}><h3>Svår</h3></button>
          </div>
        </div>
        <div className="leaderboard-box">
          <table className="leaderboardTable">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Poäng</th>
                <th>Tid</th>
                <th>Användare</th>
                <th>Datum</th>
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
                  <td data-label="Rank">{index +1}</td>
                  <td data-label="Poäng">{entry.points}</td>
                  <td data-label="Tid">{entry.timeOfCompletion}</td>
                  <td data-label="Användare">{entry.username}</td>
                  <td data-label="Datum">{formattedDate}</td>
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

import React from "react";

// CSS & Font Awesome
import "./Leaderboard.css";
import leaderboard_triangle from "@images/Leaderboard_triangle.svg";

function Leaderboard() {
  return (
    <>
      <div className="leaderboardCont">
        <div className="topDiv">
          <h1 className="leaderboardH1">Leaderboard</h1>
          <div className="triangle"></div>
          <div className="difficultyDiv">
            <h3>Lätt</h3>
            <h3>Mellan</h3>
            <h3>Svår</h3>
          </div>
        </div>
        <div className="leaderboard-box">
          <table className="leaderboardTable">
            <tr>
              <th>Rank</th>
              <th>Användare</th>
              <th>Datum</th>
              <th>Tid</th>
              <th>Poäng</th>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;

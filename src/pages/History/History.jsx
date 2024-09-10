import React, { useEffect, useState } from "react";
import "./History.css";

function History() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      fetch(`https://localhost:7007/api/Result/user/${storedUser.userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setFilteredData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  let handleFilterChange = (difficulty) => {
    if (difficulty === "All") {
      setFilteredData(userData);
    } else {
      let filteredResults = userData.filter((d) => d.difficulty === difficulty);
      setFilteredData(filteredResults);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="history-container">
        <h2>Historik</h2>
        <div className="tabs">
          <button className="tab" onClick={() => handleFilterChange("Easy")}>
            Lätt
          </button>
          <button className="tab" onClick={() => handleFilterChange("Normal")}>
            Mellan
          </button>
          <button className="tab" onClick={() => handleFilterChange("Hard")}>
            Svår
          </button>
          <button className="tab" onClick={() => handleFilterChange("All")}>
            Visa alla
          </button>
        </div>
        {filteredData.length > 0 ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>Poäng</th>
                <th>Tid</th>
                <th>Svårighetsgrad</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.points}</td>
                  <td>{entry.timeOfCompletion}</td>
                  <td>{entry.difficulty}</td>
                  <td>{new Date(entry.dateOfResult).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="noHistoryP">Ingen historik tillgänglig.</p>
        )}
      </div>
    </>
  );
}

export default History;

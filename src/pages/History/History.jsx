import React, { useEffect, useState, useCallback } from "react";
import HistoryTable from "../../components/HistoryTable/HistoryTable.component";
import "./History.css";

function History() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.userId) {
        try {
          const response = await fetch(
            `https://localhost:7007/api/Result/user/${storedUser.userId}`
          );
          const data = await response.json();
          setUserData(data);
          setFilteredData(data);
        } catch (err) {
          setError("Error fetching data. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFilterChange = useCallback(
    (difficulty) => {
      if (difficulty === "All") {
        setFilteredData(userData);
      } else {
        const filteredResults = userData.filter(
          (d) => d.difficulty === difficulty
        );
        setFilteredData(filteredResults);
      }
    },
    [userData]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
      <HistoryTable data={filteredData} />
    </div>
  );
}

export default History;

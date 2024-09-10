// src/components/HistoryTable.js
import React from "react";
import PropTypes from "prop-types";

import "./HistoryTable.styles.css";

const HistoryTable = ({ data }) => {
  return data.length > 0 ? (
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
        {data.map((entry, index) => (
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
  );
};

HistoryTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HistoryTable;

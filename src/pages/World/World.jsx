import React, { useState, useEffect } from "react";
import "./World.css";

function World() {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("Alla");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("http://localhost:3000/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
    setVisibleCount(6);
  };

  const handleSeeMoreClick = () => {
    setVisibleCount(visibleCount + 6);
  };

  const filteredCountries =
    selectedContinent === "Alla"
      ? countries
      : countries.filter((country) => country.Continent === selectedContinent);

  const visibleCountries = filteredCountries.slice(0, visibleCount);

  return (
    <>
      <div>
        <header>Se Världens Flaggor!</header>
      </div>
      <div className="continent-filter-container">
        <a
          href="#"
          className={selectedContinent === "Afrika" ? "selected" : ""}
          onClick={() => handleContinentClick("Afrika")}
        >
          Afrika
        </a>
        <a
          href="#"
          className={selectedContinent === "Antarktis" ? "selected" : ""}
          onClick={() => handleContinentClick("Antarktis")}
        >
          Antarktis
        </a>
        <a
          href="#"
          className={selectedContinent === "Asien" ? "selected" : ""}
          onClick={() => handleContinentClick("Asien")}
        >
          Asien
        </a>
        <a
          href="#"
          className={selectedContinent === "Europa" ? "selected" : ""}
          onClick={() => handleContinentClick("Europa")}
        >
          Europa
        </a>
        <a
          href="#"
          className={selectedContinent === "Nordamerika" ? "selected" : ""}
          onClick={() => handleContinentClick("Nordamerika")}
        >
          Nordamerika
        </a>
        <a
          href="#"
          className={selectedContinent === "Oceanien" ? "selected" : ""}
          onClick={() => handleContinentClick("Oceanien")}
        >
          Oceanien
        </a>
        <a
          href="#"
          className={selectedContinent === "Sydamerika" ? "selected" : ""}
          onClick={() => handleContinentClick("Sydamerika")}
        >
          Sydamerika
        </a>
        <a
          href="#"
          className={selectedContinent === "Alla" ? "selected" : ""}
          onClick={() => handleContinentClick("Alla")}
        >
          Visa alla
        </a>
      </div>
      <div className="grid-container">
        {visibleCountries.map((Country) => (
          <div key={Country.Id} className="spec-item">
            <h2>{Country.Name}</h2>
            <img
              src={Country.FlagImage}
              alt={`${Country.Name} flag`}
              className="flag-img"
            />
          </div>
        ))}
      </div>
      {visibleCount < filteredCountries.length && (
        <button className="see-more-btn" onClick={handleSeeMoreClick}>
          Se mer
        </button>
      )}
    </>
  );
}

export default World;

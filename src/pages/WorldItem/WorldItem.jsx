import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// CSS & Font Awesome
import "./WorldItem.css";

function WorldItem() {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7007/api/Country")
      .then((res) => res.json())
      .then((data) => {
        const selectedCountry = data.find((c) => c.id === parseInt(id));
        setCountry(selectedCountry);
      });
  }, [id]);

  if (!country) {
    return <div>Laddar....</div>;
  }
  return (
    <div className="world-item-container">
      <img
        src={country.flagImage}
        alt={`${country.name} flag`}
        className="flag-img-item"
      />
      <div className="world-item-info">
        <h1>{country.name}</h1>
        <p>{country.description}</p>
      </div>
    </div>
  );
}

export default WorldItem;

import React from "react";

// Router Link
import { Link } from "react-router-dom";

// CSS & Font Awesome
import "./World.css";

/*
Här ska vi fetcha Country från db
Vi ska filtrera kontinenter
Ifall ingen filter är på ska alla länder visas i bokstavsordning

*/

function World() {
  /*
  Följande ska finnas här: 

  UseState av en lista med länder


  Frågan är ifall man ska ha en lista med länder för varje kontinent eller ifall man ska ha allt i en lista och sedan filtrera listan?

  Kanske ha en metod med en variabel som fylls i filtreringen och filtrerar listan? 
  Men om man gör det så behöver man göra om det flera gånger, krävande för systemet, scratch that

  En komponent behövs i alla fall för varje land. NOTERA att detta är en vy där Flaggan och landet ska synas. 





  
  */
  return (
    <>
      <div>
        <header>Se Världens Flaggor!</header>
      </div>
      <div id="continent-filter-container">
        <a href="#">Afrika</a>
        <a href="#">Antarktis</a>
        <a href="#">Asien</a>
        <a href="#">Europa</a>
        <a href="#">Nordamerica</a>
        <a href="#">Oceanien</a>
        <a href="#">Sydamerika</a>
      </div>
      <div>Länder i grid, 3 i varje rad</div>
      <div>
        <button id="see-more-btn">Se mer</button>
      </div>
    </>
  );
}

export default World;

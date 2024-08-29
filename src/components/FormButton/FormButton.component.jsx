import React from "react";

import "./FormButton.styles.css";

function FormButton({ text, onClick }) {
  return (
    <>
      <div className="formbuttonContainer">
        <button type="button" onClick={onClick}>
          {text}
        </button>
      </div>
    </>
  );
}

export default FormButton;

import React from "react";

import "./FormInput.styles.css";

function FormInput({ label, type, name, value, onChange, id }) {
  return (
    <>
      <div className="formInput">
        <label htmlFor={name}>{label}</label>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default FormInput;

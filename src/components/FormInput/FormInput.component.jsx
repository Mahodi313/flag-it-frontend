import React from "react";

import "./FormInput.styles.css";

function FormInput({ label, type, name, value, onChange }) {
  return (
    <>
      <div className="formInput">
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} />
      </div>
    </>
  );
}

export default FormInput;

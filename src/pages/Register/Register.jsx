import { useState } from "react";

import FormInput from "../../components/FormInput/FormInput.component";
import FormButton from "../../components/FormButton/FormButton.component";

// CSS & Font Awesome
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    console.log("Registration data:", formData);
  };

  return (
    <div className="registerContainer">
      <div className="registerBox">
        <div className="h1Container">
          <h1>Registrera dig</h1>
        </div>
        <FormInput
          label="Användarnamn"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="Lösenord"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          label="Bekräfta lösenord"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <FormButton text="Skapa konto" onClick={handleRegister} />
      </div>
    </div>
  );
}

export default Register;

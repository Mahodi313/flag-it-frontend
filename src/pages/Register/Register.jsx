import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput/FormInput.component";
import FormButton from "../../components/FormButton/FormButton.component";

// CSS & Font Awesome
import "./Register.css";

function Register() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Användarnamn är obligatoriskt";
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Användarnamn måste vara mellan 3 och 20 tecken";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email är obligatoriskt";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email måste vara en giltig emailadress";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Lösenord är obligatoriskt";
    } else if (formData.password.length < 6) {
      newErrors.password = "Lösenord måste vara minst 6 tecken";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Lösenord måste innehålla minst en stor bokstav";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Lösenord måste innehålla minst en siffra";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Lösenord måste innehålla minst ett specialtecken";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Lösenorden matchar inte";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    console.log("Registration data:", formData);

    if (validateForm()) {
      fetch("https://localhost:7007/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((response) => {
          const contentType = response.headers.get("Content-Type");
          if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
              return response.json();
            } else {
              return response.text();
            }
          } else {
            if (contentType && contentType.includes("application/json")) {
              return response.json().then((errorData) => {
                throw new Error(
                  errorData.Errors
                    ? errorData.Errors.join(", ")
                    : "Registration failed"
                );
              });
            } else {
              return response.text().then((text) => {
                throw new Error(text);
              });
            }
          }
        })
        .then((data) => {
          console.log("Registration successful:", data);
          navigate(`/login`);
        })
        .catch((error) => {
          console.error("Error during registration:", error.message);
          setErrors({ apiError: error.message });
        });
    }
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
          id="username"
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <FormInput
          label="Lösenord"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          id="password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <FormInput
          label="Bekräfta lösenord"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        {errors.apiError && <p className="error">{errors.apiError}</p>}
        <FormButton text="Skapa konto" onClick={handleRegister} />
      </div>
    </div>
  );
}

export default Register;

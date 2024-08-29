import { useState } from "react";

import FormInput from "../../components/FormInput/FormInput.component";
import FormButton from "../../components/FormButton/FormButton.component";

// CSS & Font Awesome
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Användarnamn är obligatoriskt";
    }

    if (!password.trim()) {
      newErrors.password = "Lösenord är obligatoriskt";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  function handleLogin() {
    if (validateForm()) {
      fetch("https://localhost:7007/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
        credentials: "include",
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
            throw new Error(`Failed to login: ${response.status}`);
          }
        })
        .then((data) => {
          console.log("Login successful:", data);
        })
        .catch((error) => {
          console.error("Error during login:", error);
          setErrors({ apiError: error.message });
        });
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="h1Container">
          <h1>Logga in</h1>
        </div>
        <FormInput
          label="Användarnamn"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <FormInput
          label="Lösenord"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.apiError && <p className="error">{errors.apiError}</p>}
        <FormButton text="Logga in" onClick={handleLogin} type="button" />
      </div>
    </div>
  );
}

export default Login;

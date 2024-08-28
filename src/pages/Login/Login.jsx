import React from "react";
import { useState } from "react";

// CSS & Font Awesome
import "./Login.css";
import NavBar from "../../components/NavBar";


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleLogin() {
    fetch("https://localhost:7007/api/Auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password }),

        credentials: "include" 
    })
    .then(response => {
        const contentType = response.headers.get("Content-Type");
        if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                return response.json();  // Parse the JSON response
            } else {
                return response.text();  // Parse as plain text
            }
        } else {
            throw new Error(`Failed to login: ${response.status}`);
        }
    })
    .then(data => {
        console.log("Login successful:", data);
    })
    .catch(error => {
        console.error("Error during login:", error);
    });
}

  return <>
    <div className="loginContainer">
      <div className="loginBox">
        <div className="h1Container">
          <h1>Logga in</h1>
        </div>
        <label>Användarnamn</label>
        <input type="text" onChange={handleUsernameChange}/>
        <label>Lösenord</label>
        <input type="password" onChange={handlePasswordChange}/>
        <p><a href="/register">Glömt lösenord? </a></p>
        <div className="buttonContainer">
          <button type="submit" onClick={handleLogin}>Logga in</button>
        </div>
      </div>
    </div>
  </>;
}

export default Login;

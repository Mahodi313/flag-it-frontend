import React from "react";

// Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home/Home.jsx";

// Components & Hooks

// CSS
import "./App.css";

function App() {
  return (
    <>
      <h1>Tjena</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

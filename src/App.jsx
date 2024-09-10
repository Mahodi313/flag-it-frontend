import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components & Hooks
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import History from "./pages/History/History.jsx";
import Home from "./pages/Home/Home.jsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.jsx";
import Login from "./pages/Login/Login.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import QuizStart from "./pages/QuizStart/QuizStart.jsx";
import Register from "./pages/Register/Register.jsx";
import Result from "./pages/Result/Result.jsx";
import World from "./pages/World/World.jsx";
import WorldItem from "./pages/WorldItem/WorldItem.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Importera ProtectedRoute

// CSS
import "./App.css";

function App() {
  return (
    <>
      <div id="app-container">
        <Router>
          <NavBar />
          <div id="content">
            <Routes>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/quiz/:difficulty"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quizstart"
                element={
                  <ProtectedRoute>
                    <QuizStart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                }
              />{" "}
              <Route path="/world" element={<World />} />
              <Route path="/worlditem/:id" element={<WorldItem />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// CSS & Components
import "./Quiz.css";
import HourGlass from "../../components/QuizComponents/HourGlass";
import Result from "../Result/Result.jsx";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true); // Timer status
  const [warning, setWarning] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const { difficulty } = useParams();

  // Starta och uppdatera timern när sidan laddas
  useEffect(() => {
    localStorage.removeItem("quizResults");
    console.log("Tidigare quizresultat har rensats från localStorage.");

    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Uppdatera varje sekund
    }

    return () => clearInterval(timer); // Rensa timern när komponenten avmonteras
  }, [isActive]);

  // Hämta frågorna från API när sidan laddas och kör `handleRenderQuestion`
  useEffect(() => {
    fetch(`https://localhost:7007/api/Question/GetByDifficulty/${difficulty}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data); // Sätt frågorna i state
        handleRenderQuestion(data); // Kör en metod som hanterar första frågan
      });
  }, [difficulty]);

  // Funktion som hanterar den första frågan när sidan renderas
  const handleRenderQuestion = (data) => {
    const availableQuestions = data || questions;
    if (availableQuestions.length === 0) {
      setWarning("Inga frågor tillgängliga.");
      return;
    }

    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    let newQuestion = availableQuestions[randomIndex];

    setCurrentQuestion(newQuestion);
    setUsedQuestions([newQuestion.id]);

    fetchCountryById(newQuestion.countryId);
  };

  // Funktion för att hantera nästa fråga
  const handleNextQuestion = () => {
    const selectedOption = document.querySelector(
      'input[name="country"]:checked'
    );

    if (!selectedOption) {
      if (currentQuestion) {
        setWarning("Vänligen välj ett svar.");
      }
      return;
    }

    // Rensa varningen när användaren går vidare till nästa fråga
    setWarning("");

    // Spara den nuvarande frågan och användarens val i localStorage
    const result = {
      countryId: currentCountry.id, // Landets ID
      userAnswer: parseInt(selectedOption.value), // Användarens valda countryId
      correctAnswer: currentCountry.id, // Det korrekta landets ID
    };

    let quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    quizResults.push(result);
    localStorage.setItem("quizResults", JSON.stringify(quizResults));

    // Öka antalet besvarade frågor
    setAnsweredCount((prevCount) => prevCount + 1);

    // Kontrollera om 20 frågor har besvarats
    if (answeredCount + 1 === 20) {
      // Sätt quizFinished till true för att visa resultatkomponenten
      setQuizFinished(true);
      return;
    }

    // Fortsätt till nästa fråga
    const availableQuestions = questions;
    if (usedQuestions.length === availableQuestions.length) {
      setWarning("Alla frågor har besvarats!");
      return;
    }

    let randomIndex;
    let newQuestion;

    do {
      randomIndex = Math.floor(Math.random() * availableQuestions.length);
      newQuestion = availableQuestions[randomIndex];
    } while (usedQuestions.includes(newQuestion.id));

    setCurrentQuestion(newQuestion);
    setUsedQuestions((prevUsedQuestions) => [
      ...prevUsedQuestions,
      newQuestion.id,
    ]);

    fetchCountryById(newQuestion.countryId);
  };

  // Funktion för att hämta landets information baserat på CountryId
  const fetchCountryById = (countryId) => {
    fetch(`https://localhost:7007/api/Country/GetById/${countryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentCountry(data);
        fetchWrongOptions(data.id, data.name);
      })
      .catch((error) => {
        console.error("Error fetching country information:", error);
      });
  };

  // Hämta felaktiga alternativ baserat på countryId och blanda med rätt land
  const fetchWrongOptions = (excludeCountryId, correctCountryName) => {
    fetch("https://localhost:7007/api/Country")
      .then((res) => res.json())
      .then((countries) => {
        const wrongOptions = countries
          .filter((country) => country.id !== excludeCountryId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        const allOptions = shuffleOptions([
          { id: excludeCountryId, name: correctCountryName },
          ...wrongOptions.map((country) => ({
            id: country.id,
            name: country.name,
          })),
        ]);

        setCurrentQuestion((prevQuestion) => ({
          ...prevQuestion,
          options: allOptions,
        }));
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  };

  // Funktion för att slumpa ordningen på alternativen
  const shuffleOptions = (options) => {
    return options.sort(() => 0.5 - Math.random());
  };

  // Konverterar tid till minuter och sekunder
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (quizFinished) {
    return <Result />;
  }

  return (
    <>
      <div id="quiz-container-top">
        <div id="dummy-container-1" />
        <div id="quiz-title-container">
          <h1>Quizet har startat!</h1>
          <h2>
            Svårighetsnivå:{" "}
            {difficulty === "easy"
              ? "Lätt"
              : difficulty === "normal"
              ? "Mellan"
              : difficulty === "hard"
              ? "Svår"
              : "Okänd"}
          </h2>
        </div>
        <div id="quiz-info-container">
          <div id="quiz-timer-container">
            <HourGlass />
            <p>Tid: {formatTime(time)}</p>
          </div>
          {warning && <div className="warning">{warning}</div>}
        </div>
      </div>
      {currentQuestion && (
        <div id="quiz-container-bottom">
          <img
            className="flag-img"
            src={currentCountry.flagImage}
            alt="Landets flagga"
          />
          <h1>Vilket land tillhör denna flagga?</h1>
          <form>
            {currentQuestion.options &&
              currentQuestion.options.map((option, index) => (
                <div key={index} className="radio-option">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    className="option"
                    name="country"
                    value={option.id}
                  />
                  <label htmlFor={`option-${index}`}>{option.name}</label>{" "}
                </div>
              ))}
          </form>
          <button
            id="next-btn"
            className="primary-btn"
            onClick={handleNextQuestion}
          >
            Nästa
          </button>
          <div id="dummy-container-2" />
        </div>
      )}
    </>
  );
}

export default Quiz;

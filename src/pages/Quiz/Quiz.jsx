import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/auth.context";

// CSS & Components
import "./Quiz.css";
import HourGlass from "../../components/QuizComponents/HourGlass";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [time, setTime] = useState(0); // Timer
  const [isActive] = useState(true);
  const [warning, setWarning] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const { user } = useContext(AuthContext);
  const [quizResults, setQuizResults] = useState([]);

  const { difficulty } = useParams();
  const navigate = useNavigate();

  // Check if the user navigated directly via URL
  useEffect(() => {
    const fromQuizStart = localStorage.getItem("fromQuizStart");
    if (!fromQuizStart) {
      // If no flag, redirect to quizstart
      navigate("/quizstart");
    } else {
      // If navigated properly, remove the flag
      localStorage.removeItem("fromQuizStart");
    }
  }, [navigate]);

  // Starta och uppdatera timern när sidan laddas
  useEffect(() => {
    const quizStartTime = new Date();
    setStartTime(quizStartTime);

    localStorage.removeItem("quizData");
    console.log("Starttid satt för quiz:", quizStartTime);

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
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://localhost:7007/api/Question/GetByDifficulty/${difficulty}`
        );
        const data = await response.json();
        setQuestions(data);
        handleRenderQuestion(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setWarning("Kunde inte hämta frågorna, försök igen senare.");
      }
    };

    fetchQuestions();
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

  // Funktion för att spara resultatet till databasen
  const saveResultToDb = async (finalResults) => {
    try {
      const timeSpan = {
        hours: Math.floor(finalResults.TimeOfCompletion / (1000 * 60 * 60)),
        minutes: Math.floor((finalResults.TimeOfCompletion / (1000 * 60)) % 60),
        seconds: Math.floor((finalResults.TimeOfCompletion / 1000) % 60),
        milliseconds: finalResults.TimeOfCompletion % 1000,
      };

      const formattedTimeSpan = `${timeSpan.hours}:${timeSpan.minutes}:${timeSpan.seconds}.${timeSpan.milliseconds}`;

      const resultData = {
        Points: finalResults.Points,
        UserId: finalResults.UserId,
        Difficulty: finalResults.Difficulty,
        DateOfResult: new Date(finalResults.DateOfResult).toISOString(),
        TimeOfCompletion: formattedTimeSpan,
        Username: user.username,
      };

      const response = await fetch("https://localhost:7007/api/Result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        throw new Error("Failed to save result to the database");
      }
    } catch (error) {
      console.error("Error saving result to database:", error);
      setWarning("Kunde inte spara resultatet, försök igen senare.");
    }
  };

  const handleNextQuestion = () => {
    try {
      const selectedOption = document.querySelector(
        'input[name="country"]:checked'
      );

      if (!selectedOption) {
        if (currentQuestion) {
          setWarning("Vänligen välj ett svar.");
        }
        return;
      }

      setWarning("");
      const userAnswer = selectedOption.value;
      const correctAnswer = currentCountry.name;

      const newResult = {
        questionFlag: currentCountry.flagImage,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
      };

      setQuizResults((prevResults) => [...prevResults, newResult]);

      if (userAnswer === correctAnswer) {
        setCorrectAnswers((prevCorrect) => prevCorrect + 1);
      }

      setAnsweredCount((prevCount) => prevCount + 1);

      if (answeredCount + 1 === 15) {
        const newResult = {
          questionFlag: currentCountry.flagImage,
          userAnswer: userAnswer,
          correctAnswer: correctAnswer,
        };

        const updatedResults = [...quizResults, newResult];
        const quizEndDate = new Date();
        const totalMilliseconds = quizEndDate - startTime;

        const finalResults = {
          Points: correctAnswers + (userAnswer === correctAnswer ? 1 : 0),
          UserId: user.userId,
          Difficulty: difficulty,
          DateOfResult: startTime.toISOString(),
          TimeOfCompletion: totalMilliseconds,
        };

        saveResultToDb(finalResults);

        const quizData = {
          quizResults: updatedResults,
          quizDate: finalResults.DateOfResult,
          quizPoints: finalResults.Points,
          quizTime: finalResults.TimeOfCompletion,
        };

        localStorage.setItem("quizData", JSON.stringify(quizData));
        navigate("/result");
        return;
      }

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
    } catch (error) {
      console.error("Error handling the next question:", error);
      setWarning("Ett fel uppstod, försök igen.");
    }
  };

  // Funktion för att hämta landets information baserat på CountryId
  const fetchCountryById = async (countryId) => {
    try {
      const response = await fetch(
        `https://localhost:7007/api/Country/GetById/${countryId}`
      );
      const data = await response.json();
      setCurrentCountry(data);
      fetchWrongOptions(data.id, data.name);
    } catch (error) {
      console.error("Error fetching country information:", error);
      setWarning("Kunde inte hämta landets information, försök igen senare.");
    }
  };

  // Hämta felaktiga alternativ baserat på countryId och blanda med rätt land
  const fetchWrongOptions = async (excludeCountryId, correctCountryName) => {
    try {
      const response = await fetch("https://localhost:7007/api/Country");
      const countries = await response.json();
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
    } catch (error) {
      console.error("Error fetching countries:", error);
      setWarning("Kunde inte hämta alternativa länder, försök igen senare.");
    }
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

  return (
    <>
      <div id="quiz-container">
        <div id="quiz-container-top">
          <div id="quiz-questions-container">
            <h5>Frågor:</h5>
            <h5 id="quiz-count">{answeredCount + 1} / 15</h5>
          </div>
          <div id="quiz-title-container">
            <h1>Quizet har startat!</h1>
            <h2>
              Svårighetsnivå:{" "}
              {difficulty === "Easy"
                ? "Lätt"
                : difficulty === "Normal"
                ? "Mellan"
                : difficulty === "Hard"
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
                      value={option.name}
                    />
                    <label htmlFor={`option-${index}`}>{option.name}</label>
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
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;

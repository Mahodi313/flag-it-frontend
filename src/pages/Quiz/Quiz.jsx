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
  const [isActive, setIsActive] = useState(true); // Timer status
  const [warning, setWarning] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Totala poäng
  const [startTime, setStartTime] = useState(null); // Starttid för quizet
  const { user } = useContext(AuthContext);

  const { difficulty } = useParams();
  const navigate = useNavigate();

  // Starta och uppdatera timern när sidan laddas
  useEffect(() => {
    const quizStartTime = new Date();
    setStartTime(quizStartTime);

    localStorage.removeItem("quizResults");
    localStorage.removeItem("finalResults");
    console.log("Starttid satt för quiz:", quizStartTime);
    console.log("Följande användare är inloggad:", user.userId);

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

  // Funktion för att spara resultatet till databasen
  const saveResultToDb = (finalResults) => {
    // Omvandla millisekunder till en TimeSpan-liknande struktur
    const timeSpan = {
      hours: Math.floor(finalResults.TimeOfCompletion / (1000 * 60 * 60)),
      minutes: Math.floor((finalResults.TimeOfCompletion / (1000 * 60)) % 60),
      seconds: Math.floor((finalResults.TimeOfCompletion / 1000) % 60),
      milliseconds: finalResults.TimeOfCompletion % 1000,
    };

    // Konstruera TimeSpan i ISO 8601 format
    const formattedTimeSpan = `PT${timeSpan.hours}H${timeSpan.minutes}M${timeSpan.seconds}.${timeSpan.milliseconds}S`;

    // Förbered data att skicka till API
    const resultData = {
      Points: finalResults.Points,
      UserId: finalResults.UserId,
      Difficulty: finalResults.Difficulty,
      DateOfResult: new Date(finalResults.DateOfResult).toISOString(), // ISO-format för DateTime
      TimeOfCompletion: formattedTimeSpan, // Skicka korrekt formaterad TimeSpan
    };

    // Skicka POST-förfrågan till backend
    fetch("https://localhost:7007/api/Result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultData), // Skicka objektet som JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save result to the database");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resultat sparat till databasen:", data);
      })
      .catch((error) => {
        console.error("Error saving result to database:", error);
      });
  };

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

    // Kontrollera om användarens svar var korrekt
    const userAnswer = parseInt(selectedOption.value);
    const correctAnswer = currentCountry.id;

    if (userAnswer === correctAnswer) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1); // Öka poängen om svaret var rätt
    }

    // Öka antalet besvarade frågor
    setAnsweredCount((prevCount) => prevCount + 1);

    // Kontrollera om 20 frågor har besvarats
    if (answeredCount + 1 === 20) {
      // Hämta starttid och beräkna hur lång tid testet tog
      const quizEndDate = new Date(); // När quizet slutar
      const totalMilliseconds = quizEndDate - startTime; // Totala tiden i ms
      const totalSeconds = Math.floor(totalMilliseconds / 1000); // Totala sekunder

      // Formatera starttiden till ISO-format (behåll detta)
      const formattedStartTime = startTime.toISOString(); // Använd ISO format här

      // Skapa objektet för att spara i databasen
      // const finalResults = {
      //   Points: correctAnswers, // Totala poäng (antal rätt svar)
      //   UserId: `${user.userId}`, // UserID som är kopplat till den inloggade användaren
      //   Difficulty: difficulty, // Svårighetsnivå
      //   DateOfResult: formattedStartTime, // Datum och tid när testet startade (i ISO format)
      //   TimeOfCompletion: totalMilliseconds, // Skicka millisekunder direkt
      // };

      const finalResults = {
        Points: correctAnswers,
        UserId: user.userId,
        Difficulty: difficulty,
        DateOfResult: startTime.toISOString(),
        TimeOfCompletion: totalMilliseconds, // Skicka millisekunder
      };

      console.log("Testet är klart och redo att sparas:", finalResults);

      // Spara resultatet i databasen
      saveResultToDb(finalResults);

      // Navigera användaren till resultatsidan
      navigate("/result");
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

  return (
    <>
      <div id="quiz-container-top">
        <div id="quiz-questions-container">
          <h5>Frågor: {answeredCount + 1} / 20</h5>
        </div>
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

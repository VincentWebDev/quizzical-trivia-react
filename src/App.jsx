import { useState, useRef } from "react";
import Questions from "./components/Questions";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [buttonMessage, setButtonMessage] = useState("Start Quiz");
  const quizStatus = useRef("home");

  function handleClick() {
    switch (quizStatus.current) {
      case "home":
        quizStatus.current = "getQuestions";
        setButtonMessage("Check Answers");

        break;
      case "playing":
        quizStatus.current = "checkAnswers";
        setButtonMessage("Play Again");
        break;
      case "viewingAnswers":
        quizStatus.current = "getQuestions";
        setButtonMessage("Check Answers");
        break;
      default:
        quizStatus.current = "home";
        setButtonMessage("Start Quiz");
    }
  }

  function updateQuizStatus(status) {
    quizStatus.current = status;
  }

  function getQuizStatus() {
    return quizStatus.current;
  }

  return (
    <main>
      {(quizStatus.current !== "home" && (
        <Questions
          quizStatus={quizStatus.current}
          updateQuizStatus={updateQuizStatus}
          getQuizStatus={getQuizStatus}
          buttonMessage={buttonMessage}
        />
      )) || <>{quizStatus.current === "home" && <h1>Quizzical</h1>}</>}
      <button type="button" onClick={handleClick}>
        {buttonMessage}
      </button>
    </main>
  );
}

export default App;

import { useState } from "react";
import Questions from "./components/Questions";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [button, setButton] = useState("Start Quiz");
  const [displayQuestions, setDisplayQuestions] = useState(true);

  function startQuiz() {
    setDisplayQuestions(true);
    console.log("Quiz started");
  }

  return (
    <main>
      {(displayQuestions && (
        <Questions displayQuestions={displayQuestions} />
      )) || (
        <>
          <h1>Quizzical</h1>
          <button type="button" value="start-quiz" onClick={startQuiz}>
            Start Quiz
          </button>
        </>
      )}
    </main>
  );
}

export default App;

import { useState } from "react";
import Questions from "./components/Questions";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [button, setButton] = useState("Start Quiz");

  return (
    <main>
      <h1>Quizzical</h1>
      <Questions />
      <button type="button" value="start-quiz">
        {button}
      </button>
    </main>
  );
}

export default App;

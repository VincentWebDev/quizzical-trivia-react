import { useState, useEffect } from "react";
import "../App.css";
// API https://opentdb.com/api.php?amount=5&type=multiple
// API https://jsonplaceholder.typicode.com/posts/1 => placeholder

export default function Questions() {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();
      setQuestions(data.results);
    };
    getQuestions();
    console.log(questions);
    console.log("rendering");
  }, []);

  return <div>Questions:</div>;
}

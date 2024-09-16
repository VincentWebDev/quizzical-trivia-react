import { useState, useEffect } from "react";
import { decode } from "html-entities";
import "../App.css";
// API https://opentdb.com/api.php?amount=5&type=multiple
// API https://jsonplaceholder.typicode.com/posts/1 => placeholder

export default function Questions(props) {
  const [questions, setQuestions] = useState(["initial array"]);
  const { displayQuestions } = props;
  const [questionsDiv, setQuestionsDiv] = useState(
    <div>here are the questions</div>
  );
  // console.log("guestionsDiv is " + questionsDiv);

  useEffect(() => {
    console.log("useEffect runs");
    // console.log("displayQuestions is " + displayQuestions);

    const getQuestions = async () => {
      try {
        console.log("fetch runs");
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );

        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        const results = data.results;
        setQuestions(
          results.map((result) => {
            const questionsArray = {
              question: result.question,
              possible_answer: [
                ...result.incorrect_answers,
                result.correct_answer,
              ],
              correct_answer: result.correct_answer,
            };
            return questionsArray;
          })
        );
        setQuestionsDiv(
          <div>
            {questions &&
              questions.map((question, index) => {
                console.log("question.question is " + question.question);
                return <div key={index}>{question.question}</div>;
              })}
          </div>
        );
        console.log("setQuestionsDiv should have ran");
      } catch (error) {
        console.error(error);
      }
      // console.log("questions is " + questions);
      // console.log("guestionsDiv is " + questionsDiv);
    };

    getQuestions();
    // console.log("questions is " + questions);
    // console.log("guestionsDiv is " + questionsDiv);
  }, []);
  return <div>Questions: {questionsDiv}</div>;
}

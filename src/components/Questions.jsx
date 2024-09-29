import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import "../App.css";

export default function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const [scoreMessage, setScoreMessage] = useState();
  const { updateQuizStatus, getQuizStatus } = props;

  // updates questions depending on status of game
  useEffect(() => {
    if (getQuizStatus() === "getQuestions") {
      getQuestions();
      updateQuizStatus("playing");
    } else if (getQuizStatus() === "checkAnswers") {
      verifyAnswers();
      updateQuizStatus("viewingAnswers");
    } else if (getQuizStatus() === "getQuestions") {
      getQuestions();
    }
  });

  async function getQuestions() {
    let count = 0;
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );

      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      const results = data.results;
      setQuestions(
        results.map((result) => {
          const questionObj = {
            question: decode(result.question),

            possible_answers: [
              ...result.incorrect_answers.map((result) => {
                return {
                  answer: decode(result),
                  selected: false,
                };
              }),
              {
                answer: decode(result.correct_answer),
                selected: false,
              },
            ].sort(() => Math.random() - 0.5),
            correct_answer: decode(result.correct_answer),
            id: nanoid(),
          };
          return questionObj;
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  function getQuestionsDiv() {
    return questions.map((question) => {
      return (
        <div className="questions-container" key={question.id + "questions"}>
          <div className="question" aria-label="question" key={question.id}>
            {question.question}
          </div>
          <div
            className="possible_answers"
            key={question.id + "possible answers"}
          >
            <ul aria-label="possible answers" aria-multiselectable="false">
              {getAnswers(question.possible_answers, question)}
            </ul>
          </div>
        </div>
      );
    });
  }

  function getAnswers(answers, question) {
    const answersList = [];

    for (const answer of answers) {
      answersList.push(
        <li
          className={getAnswersClassName(answer, question)}
          key={question.id + answer.answer}
          aria-label="answer"
          aria-selected={answer.selected}
          onClick={(event) => {
            answerSelected(event, question.question);
          }}
        >
          {answer.answer}
        </li>
      );
    }

    return answersList;
  }

  function getAnswersClassName(answer, question) {
    if (getQuizStatus() === "playing")
      return answer.selected ? "selected-answer" : "default-answer";
    else if (getQuizStatus() === "viewingAnswers") {
      if (answer.answer === question.correct_answer) return "correct-answer";
      else if (answer.selected === true) return "wrong-answer";
      else {
        return "faded";
      }
    }
  }
  function answerSelected(event, thisQuestion) {
    // prevent answer change after viewing answers
    if (getQuizStatus() === "viewingAnswers") return;

    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        return {
          ...question,
          possible_answers: question.possible_answers.map((prevAnswer) => {
            if (thisQuestion === question.question) {
              return {
                answer: prevAnswer.answer,
                selected:
                  event.target.textContent === prevAnswer.answer ? true : false,
              };
            } else {
              return {
                answer: prevAnswer.answer,
                selected: prevAnswer.selected,
              };
            }
          }),
        };
      });
    });
  }

  function verifyAnswers() {
    let currentScore = 0;
    const selectedAnswers = questions.map((question) => {
      for (let i = 0; i < question.possible_answers.length; i++)
        if (question.possible_answers[i].selected === true)
          return question.possible_answers[i].answer;
    });

    const correctAnswers = questions.map((question) => question.correct_answer);

    for (let i = 0; i < selectedAnswers.length; i++) {
      if (selectedAnswers[i] === correctAnswers[i]) {
        currentScore++;
      }
    }

    setScoreMessage(`You scored ${currentScore}/5 correct answers`);
  }

  return (
    <div className="questions-container">
      {getQuestionsDiv()}
      <div className="score" aria-label="score">
        {props.quizStatus === "checkAnswers" && scoreMessage}
      </div>
    </div>
  );
}

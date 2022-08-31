import React from "react";
import "./App.css";
import Question from "./components/Question";
import Score from "./components/Score";
import { nanoid } from "nanoid";

function App() {
  const [questions, setQuestions] = React.useState([]);
  const [quizzical, setQuizzical] = React.useState(false);

  function startGame() {
    generateQuestions();
  }

  function checkAnswers() {
    if (quizzical) {
      setQuizzical(false);
    } else {
      generateQuestions();
    }
  }

  async function generateQuestions() {
    // https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple&encode=url3986
    setQuizzical(true);

    const base = "https://opentdb.com/api.php";
    let numQuestions = 5;
    let category = 0;
    let difficulty = 0;
    let questionType = "multiple";
    // let encoding = "base64";
    const url = `${base}?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${questionType}`;
    const res = await fetch(url);
    const data = await res.json();

    let questionData = data.results.map((question: any) => {
      return {
        ...question,
        selected: false,
      };
    });
    setQuestions(questionData);
  }

  const questionElements = questions.map((question) => {
    return <Question key={nanoid()} question={question} />;
  });

  return (
    <div className="App">
      <div>
        <p className="title-header">Quizzical</p>
        <p className="title-subheader">Test your trivia knowledge!</p>
        <button className="start-btn" onClick={startGame}>
          Start Quiz
        </button>
      </div>
      <div>
        <div className="questions-list">{questionElements}</div>
        <Score handleClick={generateQuestions} />
        <button className="game-btn" onClick={checkAnswers}>
          {quizzical ? "Check answers" : "Play again"}
        </button>
      </div>
    </div>
  );
}

export default App;

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./Quizzical.scss";
import { nanoid } from "nanoid";
import axios from "axios";
import Question from "../Question/Question";
import React, { useEffect, useState } from "react";

const categories = [
  [0, "Any Category"],
  [9, "General Knowledge"],
  [10, "Entertainment: Books"],
  [11, "Entertainment: Film"],
  [12, "Entertainment: Music"],
  [13, "Entertainment: Musicals & Theatres"],
  [14, "Entertainment: Television"],
  [15, "Entertainment: Video Games"],
  [16, "Entertainment: Board Games"],
  [17, "Science & Nature"],
  [18, "Science: Computers"],
  [19, "Science: Mathematics"],
  [20, "Mythology"],
  [21, "Sports"],
  [22, "Geography"],
  [23, "History"],
  [24, "Politics"],
  [25, "Art"],
  [26, "Celebrities"],
  [27, "Animals"],
];

function Quizzical() {
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "10",
    category: "0",
    difficulty: "0",
    type: "0",
  });

  function generateQuiz() {
    const base = "https://opentdb.com/api.php";
    const finalUrl = `${base}?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;

    axios
      .get(finalUrl)
      .then((response) => {
        const data = response.data;

        setTimeout(() => {
          setQuestions(data.results);
          setLoading(false); 
        }, 2000);
      })
      .catch((error) => console.error(error));
  }



  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    generateQuiz();
  }

  return (
    <div className="Quizzical">
      <div className="MenuPage">
        <div className="Header">
          <p className="title">Quizzical</p>
          <p className="subtitle">Test your trivia knowledge!</p>
        </div>

        <form onSubmit={handleSubmit} className="QuizForm">
          <div className="trivia-input">
            <label htmlFor="amount">Number of Questions</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              name="amount"
            />
          </div>
          <div className="trivia-input">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              name="category"
            >
              <option value="0">Any Category</option>
              {categories.map((c) => (
                <option value={c[0]} key={nanoid()}>
                  {c[1]}
                </option>
              ))}
            </select>
          </div>
          <div className="trivia-input">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              name="difficulty"
            >
              <option value="0">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="trivia-input">
            <label htmlFor="type">Question Type</label>
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
              name="type"
            >
              <option value="0">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <button className="btn-start" onClick={generateQuiz}>
            Start Quiz
          </button>
        </form>
      </div>

      <div className="QuizPage">
        {loading ? (
          <div className="loading-wrapper">
            <div className="loading-animation">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            <div className="header">
              <Link to="/" className="btn">
                Back
              </Link>
            </div>

            <div className="questions">
              {questions.map((question) => {
                return (
                  <Question key={nanoid()} questionData={question}></Question>
                );
              })}
            </div>

            <div className="footer">
              {gameOver ? (
                <div className="flex">
                  <p className="score-text">
                    You scored _/{questions.length} correct answers
                  </p>
                  <button className="btn-game" onClick={generateQuiz}>
                    Play again
                  </button>
                </div>
              ) : (
                <button className="btn-game flex" onClick={generateQuiz}>
                  Check Answers
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quizzical;

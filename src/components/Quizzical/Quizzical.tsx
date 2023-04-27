import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Question from "../Question/Question";
import "./Quizzical.scss";

const categories = [
  //   [0, "Any Category"],
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
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "5",
    category: "0",
    difficulty: "0",
    type: "0",
  });
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  function generateQuiz() {
    const base = "https://opentdb.com/api.php";
    const finalUrl = `${base}?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;

    resetGame();

    axios
      .get(finalUrl)
      .then((response) => {
        const data = response.data;
        setQuestions(data.results);
        const correctAnswers = data.results.map((question: any) => {
          return question.correct_answer;
        });
        setCorrectAnswers(correctAnswers);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    setSelectedAnswers(Array(questions.length).fill(""));
  }, [questions]);

  function resetGame() {
    setGameOver(false);
    setQuestions([]);
    setScore(0);
    setSelectedAnswers([]);
  }

  function playAgain() {
    resetGame();
    generateQuiz();
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

  function checkAnswers() {
    let score = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (selectedAnswers[i] === correctAnswers[i]) {
        score++;
      }
    }
    setScore(score);
    setGameOver(true);
  }

  return (
    <div className="Quizzical">
      <form onSubmit={handleSubmit} className="QuizForm">
        <div className="title">
          <p className="main">Quizzical</p>
          <p className="subtitle">Test your trivia knowledge!</p>
        </div>

        <div className="input-wrapper">
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
        </div>

        <button className="btn-start" onClick={generateQuiz}>
          Start Quiz
        </button>
      </form>

      <div className="Quiz">
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
            {questions.length > 0 && (
              <>
                <div className="questions">
                  {questions.map((question, index) => {
                    return (
                      <Question
                        key={index}
                        questionData={question}
                        setSelectedAnswers={setSelectedAnswers}
                        questionIndex={index}
                        gameOver={gameOver}
                      />
                    );
                  })}
                </div>

                <div className="footer">
                  {gameOver ? (
                    <div className="flex">
                      <p className="score-text">
                        You scored {score}/{questions.length} correct answers
                      </p>
                      <button className="btn-game" onClick={playAgain}>
                        Play again
                      </button>
                    </div>
                  ) : (
                    <button className="btn-game flex" onClick={checkAnswers}>
                      Check Answers
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Quizzical;

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, {useContext} from "react";
import { nanoid } from "nanoid";
import Form from "../components/Form"
import { Context } from "../Context";
import FormInput from "../components/FormInput";




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
  [27, "Animals"]
];


export default function Menu(props: any) {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        amount: "10",
        category: "0",
        difficulty: "0",
        type: "0",
    });


    // const { questions, apiUrl } = useContext(Context);

    function handleChange(event: any) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
        return {
            ...prevFormData,
            [name]: value,
        };
        });
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        generateQuiz();
    }


    function generateQuiz() {
        const base = "https://opentdb.com/api.php";
        const finalUrl = `${base}?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;
        console.log(formData);
        console.log(finalUrl);
        navigate("/quiz");
    }


  return (
    <div className="Menu">
      <div>
        <p className="title-header">Quizzical</p>
        <p className="title-subheader">Test your trivia knowledge!</p>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="trivia-form">

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
          <button className="start-btn" onClick={props.startGame}>
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

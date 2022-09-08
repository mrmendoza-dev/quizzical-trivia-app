import React from "react";
import { nanoid } from "nanoid";
import Question from "./components/Question";

import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Menu from "./pages/Menu"
import Quiz from "./pages/Quiz";


function App() {
  const defaultUrl = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple&encode=url3986";
  
  const [questions, setQuestions] = React.useState([]);
  const [quizzical, setQuizzical] = React.useState(false);
  const [quizUrl, setQuizUrl] = React.useState(defaultUrl);

  const navigate = useNavigate();


      const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        comments: "",
        isFriendly: true,
        employment: "",
        favColor: "",
      });

      function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
          };
        });
      }

      function handleSubmit(event) {
        // event.preventDefault()
        // submitToApi(formData)
        console.log(formData);
      }

      


    async function generateQuestions() {
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
      navigate("/quiz");
      console.log("test");
    }

    function startGame() {
      generateQuestions();
    }

      const questionElements = questions.map((question) => {
        return <Question key={nanoid()} question={question} />;
      });






  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Menu />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );


}

export default App;

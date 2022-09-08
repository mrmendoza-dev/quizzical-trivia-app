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


    const questionElements = questions.map((question) => {
      return <Question key={nanoid()} question={question} />;
    });






  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );


}

export default App;

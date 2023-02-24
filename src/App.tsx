import React from "react";
import { nanoid } from "nanoid";
import Question from "./components/Question";
import "./css/App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import QuizPage from "./pages/QuizPage";


function App() {
  
  





  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </div>
  );


}

export default App;

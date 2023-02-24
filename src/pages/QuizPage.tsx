import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import Score from "../components/Score";
import { nanoid } from "nanoid";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import marked from "marked";


export default function QuizPage(props: any) {

const [questions, setQuestions] = useState([]);
const [gameOver, setGameOver] = useState(false);


      const [formData, setFormData] = React.useState({
        amount: "10",
        category: "0",
        difficulty: "0",
        type: "0",
      });

     function generateQuiz() {
      console.log("test")
       const base = "https://opentdb.com/api.php";


       const finalUrl = `${base}?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;

       fetch(finalUrl)
         .then((response) => response.json())
         .then((data) => {
                 setQuestions(data.results);

         })
         .catch((error) => console.error(error));

     }

     useEffect(()=> {
      generateQuiz();

     }, [])


     function checkAnswers() {
        setGameOver(true);
     }

     function startGame() {
      setGameOver(false);
     }



  return (
    <div className="QuizPage">
      <div className="header">
        <Link  to="/" className="btn">Back</Link>
      </div>
      <div className="questions">
        {questions.map((question) => {
          return <Question key={nanoid()} questionData={question}></Question>;
        })}
      </div>

      <div className="footer">
        {gameOver ? (
          <div className="flex">
            <p className="score-text">
              You scored _/{questions.length} correct answers
            </p>
            <button className="btn-game" onClick={startGame}>
              Play again
            </button>
          </div>
        ) : (
          <div className="flex">
            <button className="btn-game" onClick={checkAnswers}>
              Check Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




      // <div key={nanoid()} className="Question">
      //   {/* <p className="">{question.question}</p> */}
      //   <div dangerouslySetInnerHTML={{ __html: question.question }} />
      //   <div className="">
      //     <ul>
      //       <li>Answer</li>
      //     </ul>
      //   </div>
      // </div>;
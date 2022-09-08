import React from "react";
import Question from "../components/Question";
import Score from "../components/Score";
import { nanoid } from "nanoid";
import { Routes, Route, Link, useNavigate } from "react-router-dom";





export default function Quiz(props: any) {

 
  return (
    <div className="Quiz">
      <div>
        <div className="questions-list">{props.questionElements}</div>
        <Score handleClick={props.generateQuestions} />
        <button className="game-btn" onClick={props.checkAnswers}>
          {props.quizzical ? "Check answers" : "Play again"}
        </button>

        <Link to="/" className="start-btn">
          Menu
        </Link>
      </div>
    </div>
  );
}

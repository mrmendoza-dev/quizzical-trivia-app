import { nanoid } from "nanoid";
import marked from "marked";
import { useState, useEffect} from "react";

export default function Question(props: any) {
  let questionData = props.questionData;
    const [selectedAnswer, setSelectedAnswer] = useState("");
const [answers, setAnswers] = useState<any>([]);



  useEffect(()=> {
  let correct = questionData.correct_answer;
  let incorrect = questionData.incorrect_answers;
  let answersArray: any = [];

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  incorrect.forEach((answer: any) =>
    answersArray.push({ answer: answer, correct: false })
  );
  answersArray.push({ answer: correct, correct: true });
  shuffleArray(answersArray);
  setAnswers(answersArray);
  }, [])






  const handleAnswerClick = (answer: any) => {
    setSelectedAnswer(answer);
      // console.log(answer);
  };

  return (
    <div className="Question">
      <p
        className="prompt"
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      />

      <div className="subheader">
        <p className="category">{questionData.category}</p>
        <p className="difficulty">{questionData.difficulty}</p>
      </div>

      <div className="answers">
        {answers.map((answer: any, index: any) => {
          const isCorrect: any = answers[index].correct;
          const isSelected = selectedAnswer === answers[index].answer;

          let className = "btn-answer";

          if (isSelected) {
            className += isCorrect ? " correct" : " incorrect";
          }

          return (
            <button
              key={nanoid()}
              className={isSelected ? "btn-answer btn-selected" : "btn-answer"}
              onClick={() => handleAnswerClick(answers[index].answer)}
              // disabled={
              //   selectedAnswer !== "" &&
              //   selectedAnswer !== answersArray[index].answer
              // }

              style={{}}
            >
              <p dangerouslySetInnerHTML={{ __html: answers[index].answer }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

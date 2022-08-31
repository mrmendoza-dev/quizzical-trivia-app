

export default function Question(props: any) {
  let questionData = props.question;

  let correct = questionData.correct_answer;
  let incorrect = questionData.incorrect_answers;
  let answersArray = [];

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

  return (
    <div className="Question">
      <p className="question-prompt">{questionData.question}</p>

      <div className="question-subheader">
        <p className="question-category">{questionData.category}</p>
        <p className="question-difficulty">{questionData.difficulty}</p>
      </div>

      <div className="question-answers">
        <button className="question-btn">{answersArray[0].answer}</button>
        <button className="question-btn">{answersArray[1].answer}</button>
        <button className="question-btn">{answersArray[2].answer}</button>
        <button className="question-btn">{answersArray[3].answer}</button>
      </div>
    </div>
  );
}

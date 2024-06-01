import { useState, useEffect } from "react";
import Form from "./Form";
import "../index.css";

function QuizForm({
  correctAnswer,
  lableTitle,
  quizField,
  solved,
  id,
  onSolved,
}) {
  //A state variable that checks if the quiz is solved
  const [solvedState, setSolvedState] = useState(solved);
  //State variable that checks if the quiz has been attempted
  const [attempted, setAttempted] = useState(false);

  function validateAnswer(userGuess) {
    setAttempted(true);
    console.log("the correct answer is :", correctAnswer);

    if (userGuess === correctAnswer) {
      console.log("correct");
      setSolvedState(true);
      return true;
    } else {
      console.log("wrong");
      setSolvedState(false);
      return false;
    }
  }

  function handleValidationSubmition(userGuess) {
    if (validateAnswer(userGuess)) {
      onSolved(id);
    }

  }

  return (
    <div
      className={` flex justify-center items-center gap-2 ${solvedState ? "gap-4" : ""}`}
    >
      <div className={`overlay ${(attempted&&solved)?"bg-green-500":""} ${(attempted&&!solved?"bg-red-500":"")} ${(!attempted)?"bg-transparent":""}`}>
        <label
          htmlFor="quiz-form"
          id="quiz-form-label"
          className="w-10 min-w-10 visible"
        >
          {lableTitle}
        </label>
      </div>

      <div className={`${!solvedState ? "visible" : "hidden"} mr-10 `}>
        <Form onSubmit={handleValidationSubmition} />
      </div>
    </div>
  );
}

export default QuizForm;

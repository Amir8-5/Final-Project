import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizForm from "../components/QuizForm";

export default function Main() {
  const location = useLocation();
  const [quizElementArray, setQuizElementArray] = useState(null);
  const [quizElement, setQuizElement] = useState(null);
  const [apiData, setApiData] = useState(location.state.apiData);

  useEffect(() => {
    console.log("quiz element array is ", quizElementArray);
    if (apiData != null && quizElementArray == null) {
      console.log("called the set quiz element array");
      setQuizElementArray([
        {
          quizField: "Year",
          title: "Release Year",
          userGuess: "",
          correctAnswer: apiData["Year"],
          solved: false,
          id: 1,
        },
        {
          quizField: "Runtime",
          title: "Runtime",
          userGuess: "",
          correctAnswer: apiData["Runtime"].substring(
            0,
            apiData["Runtime"].indexOf(" ")
          ),
          solved: false,
          id: 2,
        },
        {
          quizField: "imdbRating",
          title: "Rating",
          userGuess: "",
          correctAnswer: apiData["imdbRating"],
          solved: false,
          id: 3,
        },
        {
          quizField: "BoxOffice",
          title: "Box Office",
          userGuess: "",
          correctAnswer: apiData["BoxOffice"],
          solved: false,
          id: 4,
        },
      ]);
    }
  }, [apiData, quizElementArray]);


  function handleSolve(id) {
    console.log("called handle solve");
    setQuizElementArray(
      quizElementArray.map((quiz) => {
        if (quiz.id === id) {
          return { ...quiz, solved: !quiz.solved };
        }
        return quiz;
      })
    );
  }

  return (
    <div className="flex flex-col flex-wrap grow shrink items-center justify-center w-screen gap-10">
      <div
        className={`w-10/12 h-screen border flex flex-col justify-start items-center gap-6 border-gray-400 rounded bg-lavender`}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-4xl lato-bold text-green-950 m-4">
            {apiData != null ? apiData.Title : ""}
          </h1>
          {apiData != null ? (
            <img src={apiData["Poster"]} alt="pic" className="" />
          ) : (
            ""
          )}
        </div>
        {quizElementArray!=null ?
          quizElementArray.map((quizElement) => (
            <QuizForm
              lableTitle={quizElement.title}
              quizField={quizElement.quizField}
              correctAnswer={quizElement.correctAnswer}
              key={quizElement.id}
              id={quizElement.id}
              solved={quizElement.solved}
              onSolved={handleSolve}
            />
          )):""}
      </div>
    </div>
  );
}

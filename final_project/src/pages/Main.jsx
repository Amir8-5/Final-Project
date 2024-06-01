import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import QuizForm from "../components/QuizForm";

export default function Main() {
  const [apiData, setApiData] = useState();
  const [quizDisplayState, setQuizDisplayState] = useState("hidden");
  const [quizElementArray, setQuizElementArray] = useState([]);
  const apiKey = "c0f5ebc6";

  useEffect(() => {
    setQuizDisplayState(apiData ? "visible" : "hidden");
    setQuizElementArray((apiData && apiData.Response === "True") ? [
      {
        quizField: "Year",
        title: "Release Year",
        userGuess: "",
        correctAnswer: apiData["Year"],
        solved: false,
        id: 1
      },
      {
        quizField: "Runtime",
        title: "Runtime",
        userGuess: "",
        correctAnswer: apiData["Runtime"].substr(0, apiData["Runtime"].indexOf(" ")),
        solved: false, 
        id: 2
      },
      {
        quizField: "imdbRating",
        title: "Rating",
        userGuess: "",
        correctAnswer: apiData["imdbRating"],
        solved: false,
        id: 3
      },
      {
        quizField: "BoxOffice",
        title: "Box Office",
        userGuess: "",
        correctAnswer: apiData["BoxOffice"],
        solved: false,
        id: 4
      }
    ]: []);
  }, [apiData]);

  useEffect(
    () => {
      console.log(quizElementArray);
    },
    [quizElementArray]
  )

  async function handleApi(movieName) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`
      );
      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      console.log("there was an error");
      setApiData(null);
    }
  }

  function handleSolve(id) {
    console.log('called handle solve');
    setQuizElementArray(quizElementArray.map(quiz => {
      if (quiz.id === id) {
        return {... quiz, solved : !quiz.solved}
      }
      return quiz;
    }))
  }

  return (
    <div className="flex flex-col flex-wrap grow shrink items-center justify-center w-screen gap-10">
      <div className="w-10/12 felx justify-center">
        <Form onSubmit={handleApi} />
      </div>
      <div
        className={`w-10/12 h-screen border  border-gray-400 rounded bg-lavender ${quizDisplayState}`}
      >
        {quizElementArray.map((quizElement) => {
          return (
            <QuizForm
              lableTitle={quizElement.title}
              quizField={quizElement.quizField}
              correctAnswer={quizElement.correctAnswer}
              key={quizElement.id}
              id={quizElement.id}
              solved={quizElement.solved}
              onSolved={handleSolve}
            />
          );
        })}
      </div>
    </div>
  );
}

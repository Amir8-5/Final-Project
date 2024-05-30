import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";



  export default function Main() {
    const [apiData, setApiData] = useState();
    const [quizDisplayState, setQuizDisplayState] = useState("hidden");
    const apiKey = "c0f5ebc6";
    const navigate = useNavigate();
  
    useEffect(() => {
      setQuizDisplayState(apiData ? "visible" : "hidden");
    }, [apiData]);
  
    function validateAnswer(quizField, userGuess) {
      let correctAnswer = apiData[quizField];
      if (quizField === "Runtime") {
        correctAnswer = correctAnswer.substr(0, correctAnswer.indexOf(" "));
      }
  
      console.log("the correct answer is :", correctAnswer);
  
      if (userGuess === correctAnswer) {
        console.log("correct");
        return true;
      } else {
        console.log("wrong");
        return false;
      }
    }

    function QuizForm({ onSubmit, lableTitle, quizField }) {
        const [visibilityState, setVisibilityState] = useState("visible");
      
        function handleValidationSubmition(userGuess) {
          if (onSubmit(quizField, userGuess)) {
            setVisibilityState("hidden");
          }
          
        }
      
        return (
          <div className="w-full flex justify-center items-center gap-2">
            <label htmlFor="quiz-form" id="quiz-form-label" className="w-10 min-w-10 ">
              {lableTitle}
            </label>
            <div className={`${visibilityState} mr-10`}>
              <Form onSubmit={handleValidationSubmition} />
            </div>
            <div className={`${(visibilityState==="visible")?"hidden" : "visible"} w-full max-w-28 h-8 bg-green-500 cursor-pointer`}>
            </div>
          </div>
        );
      }
      
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

    return (
        <div className="flex flex-col flex-wrap grow shrink items-center justify-center w-screen gap-10">
          <div className="w-10/12 felx justify-center">
            <Form onSubmit={handleApi} />
          </div>
          <div
            className={`w-10/12 h-screen border  border-gray-400 rounded bg-lavender ${quizDisplayState}`}
          >
            <QuizForm
              onSubmit={validateAnswer}
              lableTitle="Release Year"
              quizField={"Year"}
            />
            <QuizForm
              onSubmit={validateAnswer}
              lableTitle="Rating"
              quizField={"imdbRating"}
            />
            <QuizForm
              onSubmit={validateAnswer}
              lableTitle="Box Office"
              quizField={"BoxOffice"}
            />
            <QuizForm
              onSubmit={validateAnswer}
              lableTitle="Runtime"
              quizField={"Runtime"}
            />
          </div>
        </div>
    );
  }
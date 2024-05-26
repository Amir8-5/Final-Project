import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [apiData, setApiData] = useState();
  const apiKey = "c0f5ebc6";

  async function handleApi(movieName) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      console.log("there was an error");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen gap-10">
      <Form onSubmit={handleApi} />
      <div className="w-10/12 h-screen border border-gray-400 rounded bg-lavender">
        
      </div>
    </div>
  );
}

export default App;

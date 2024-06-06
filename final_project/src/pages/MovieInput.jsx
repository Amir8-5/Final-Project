import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MovieInput() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const apiKey = "c0f5ebc6";


  async function handleApi(movieName) {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`
      );
      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      setApiData(data);
      console.log(data);
      navigate('Main-page', {state: {apiData: data}});
    } catch (error) {
      console.error(error);
      setApiData(null);
      alert("Enter a valid movie name")
    }
  }
  

  return (
    <div className="w-full flex justify-center items-center">
      <Form onSubmit={handleApi} />
    </div>
  );
}

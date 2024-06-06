import Main from './pages/Main'
import MovieInput from './pages/MovieInput'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState} from "react";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieInput/>} />
        <Route path="/Main-page" element={<Main/>} />
      </Routes>
    </Router>

  );
}

export default App;

import React, { useState } from "react";
import ChessGame from "./components/Chessboard";
import AISelection from "./components/AISelection";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [selectedAI, setSelectedAI] = useState("");
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="App">
       <ToastContainer />
      <h1>Chess with AI</h1>
      <AISelection selectedAI={selectedAI} setSelectedAI={setSelectedAI} apiKey={apiKey} setApiKey={setApiKey} />
      <ChessGame selectedAI={selectedAI} apiKey={apiKey} />
    </div>
  );
};

export default App;

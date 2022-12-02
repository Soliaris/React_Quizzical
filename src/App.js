import React from 'react';
import './App.css';
import Home from "./Home"
import Quizz from "./Quizz"

function App() {

  const [gameStart, setGameStart] = React.useState(false)

  function startGame () {
    setGameStart(true)
  }

  return (
    <div className="App">
        {gameStart? <Quizz /> : <Home startGame={startGame}/>}
    </div>
  );
}

export default App;

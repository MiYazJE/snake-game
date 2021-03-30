import Board from './components/Board';
import './App.css';
import useScore from './hooks/useScore';

function App() {
  const { currentScore, updateScore, saveScore, getMaxScore } = useScore();

  return (
    <div className="app">
      <h1>Snake Game</h1>
      <Board
        updateScore={updateScore}
        saveScore={saveScore}
      />
      <div className="info">
        <div className="score">
          <p className="currentPoints"><strong>Current Score:</strong> <span>{currentScore}</span></p>
          <p className="maxPoints"><strong>Max Score:</strong> <span>{getMaxScore()}</span></p>
        </div>
        <div className="controls">
          <p>Left: a | Right: d | Bottom: s | Up: w</p>
          <span>Press some key to start...</span>
        </div>
      </div>
    </div>
  );
}

export default App;

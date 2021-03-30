import { useState } from "react";

const useScore = () => {
  const [currentScore, setCurrentScore] = useState(0);

  const saveScore = () => {
    const maxScore = getMaxScore() || 0;
    if (currentScore > maxScore) {
      window.localStorage.setItem('score', JSON.stringify({ score: currentScore }));
    }
  };

  const getMaxScore = () => {
    return JSON.parse(window.localStorage.getItem('score')).score || 0;
  };

  return {
    currentScore,
    saveScore,
    getMaxScore,
    updateScore: (points) => setCurrentScore(currentScore + points),
  };
};

export default useScore;
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Cell from './Cell';
import { spawnValidFruit } from '../helpers/';
import useControls from '../hooks/useControls';

const Board = () => {
  const { stop } = useControls(moveSnake);

  const WIDTH = useMemo(() => 20, []);
  const HEIGHT = useMemo(() => 20, []);
  const stylesBoard = useMemo(() => ({
    gridTemplateRows: `repeat(${WIDTH}, 1fr)`,
    gridTemplateColumns: `repeat(${HEIGHT}, 1fr)`,
    maxWidth: `${WIDTH * 25}px`,
  }), [WIDTH, HEIGHT]);

  const [snake, setSnake] = useState([
    {
      x: parseInt(WIDTH / 2),
      y: parseInt(HEIGHT / 2),
    },
    {
      x: parseInt(WIDTH / 2) - 1,
      y: parseInt(HEIGHT / 2),
    },
  ]);
  const [fruit, setFruit] = useState({
    x: parseInt(Math.random() * WIDTH),
    y: parseInt(Math.random() * HEIGHT),
  });
  const [board, setBoard] = useState(
    [...new Array(HEIGHT)].map(() => [...new Array(HEIGHT)])
  );
  const [gameOver, setGameOver] = useState(false);

  const isFruit = useCallback((i, j) => {
    return fruit.x === j && fruit.y === i;
  }, [fruit]);

  const isSnake = useCallback((i, j) => {
    return snake.some(({ x, y }) => x === j && y === i)
  }, [snake]);

  useEffect(() => {
    setBoard(prevBoard => {
      return prevBoard.map((row, i) => {
        return [...row.map((_, j) => {
          const hasFruit = isFruit(i, j);
          const hasSnake = isSnake(i, j);
          return {
            hasFruit,
            hasSnake,
            isSafe: !hasFruit && !hasSnake,
            id: (i * j) + j
          }
        })]
      });
    });
  }, [isSnake, isFruit, fruit, snake]);

  useEffect(() => {
    if (gameOver) stop();
  }, [gameOver, stop]);

  function moveSnake({ x, y }) {
    const headSnake = snake[0];
    const tail = snake[snake.length - 1];

    const newX = headSnake.x + x;
    const newY = headSnake.y + y;
    if ((newY < 0 || newY === WIDTH || newX < 0 || newX === HEIGHT)
      || isSnake(newY, newX)) {
      console.log('game over');
      setGameOver(true);
      return;
    }

    const eatenFruit = isFruit(newY, newX);
    let prevPartSnake = { x: newX, y: newY };
    const updatedSnake = [...snake].map(currentPartSnake => {
      const copyPartSnake = { ...prevPartSnake };
      prevPartSnake = currentPartSnake;
      return copyPartSnake;
    });

    if (eatenFruit) {
      setFruit(spawnValidFruit(board))
      updatedSnake.push({ ...tail });
    }
    setSnake(updatedSnake);
  }

  return (
    <div className="board" style={stylesBoard}>
      {board.map(row => [...row.map(cell => (
        <Cell
          key={cell?.id}
          {...cell}
        />
      ))])}
    </div>
  );
};

export default Board;
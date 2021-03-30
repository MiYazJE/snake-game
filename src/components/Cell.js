import React, { memo } from 'react';

const Cell = memo(({ hasSnake, hasFruit }) => {
  const snakeClass = hasSnake ? 'snake' : '';
  const fruitClass = hasFruit ? 'fruit' : '';
  const cellClass = `cell ${snakeClass} ${fruitClass}`
  return (
    <div className={cellClass}>

    </div>
  );
});

export default Cell;
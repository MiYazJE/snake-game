export const spawnValidFruit = (board) => {
  while (true) {
    const y = parseInt(Math.random() * board.length);
    const x = parseInt(Math.random() * board[0].length);
    if (board[x][y].isSafe) {
      return { y, x };
    }
  }
};
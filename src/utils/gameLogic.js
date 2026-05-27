const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

export function calculateWinner(board) {
  for (let line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'X' or 'O'
    }
  }
  return null;
}

export function isBoardFull(board) {
  return board.every(cell => cell !== null);
}

export function getGameStatus(board, currentPlayer) {
  const winner = calculateWinner(board);
  if (winner) {
    return { winner, isDraw: false, nextPlayer: null };
  }
  if (isBoardFull(board)) {
    return { winner: null, isDraw: true, nextPlayer: null };
  }
  return { winner: null, isDraw: false, nextPlayer: currentPlayer };
}
export default function Status({ winner, isDraw, currentPlayer }) {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next Player: ${currentPlayer}`;
  }
  return <div className="status">{status}</div>;
}
import Square from './Square';

export default function Board({ board, onSquareClick, gameOver }) {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
          disabled={!!value || gameOver}
        />
      ))}
    </div>
  );
}
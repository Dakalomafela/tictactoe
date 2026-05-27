import { useEffect } from 'react';
import { useGameReducer } from './hooks/useGameReducer';
import Board from './components/Board';
import Status from './components/Status';
import './App.css';

function App() {
  const { state, dispatch } = useGameReducer();

  // Computer AI – plays O automatically after a short delay
  useEffect(() => {
    if (
      state.vsComputer &&
      state.currentPlayer === 'O' &&
      !state.winner &&
      !state.isDraw
    ) {
      const timer = setTimeout(() => {
        const emptyCells = state.board
          .map((val, idx) => (val === null ? idx : null))
          .filter((v) => v !== null);
        if (emptyCells.length > 0) {
          const randomIndex =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
          dispatch({ type: 'MAKE_MOVE', payload: { index: randomIndex } });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.currentPlayer, state.board, state.winner, state.isDraw, state.vsComputer, dispatch]);

  const handleSquareClick = (index) => {
    dispatch({ type: 'MAKE_MOVE', payload: { index } });
  };

  const gameOver = state.winner || state.isDraw;

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Status
        winner={state.winner}
        isDraw={state.isDraw}
        currentPlayer={state.currentPlayer}
      />
      <Board
        board={state.board}
        onSquareClick={handleSquareClick}
        gameOver={gameOver}
      />
      <button onclick={() => dispatch({ type: 'RESET' })}>Restart</button>
    </div>
  );
}

export default App;
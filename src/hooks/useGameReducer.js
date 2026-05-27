import { useReducer } from 'react';
import { getGameStatus } from '../utils/gameLogic';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  vsComputer: true,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action.payload;
      if (state.board[index] || state.winner || state.isDraw) return state;

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;
      const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      const { winner, isDraw } = getGameStatus(newBoard, nextPlayer);

      return {
        ...state,
        board: newBoard,
        currentPlayer: winner || isDraw ? state.currentPlayer : nextPlayer,
        winner,
        isDraw,
      };
    }
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function useGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
}
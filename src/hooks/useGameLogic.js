import { useState, useCallback, useEffect } from 'react';
import { 
  initializeGame, 
  addRandomTile, 
  moveLeft, 
  moveRight, 
  moveUp, 
  moveDown, 
  hasWon, 
  isGameOver 
} from '../utils/gameLogic';

export const useGameLogic = (initialSize = 4) => {
  const [board, setBoard] = useState(() => initializeGame(initialSize));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [boardSize, setBoardSize] = useState(initialSize);

  const initialize = useCallback((newSize = boardSize) => {
    setBoard(initializeGame(newSize));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setBoardSize(newSize);
  }, [boardSize]);

  const handleMove = useCallback((moveFunction) => {
    if (gameOver || won) return;

    const { board: newBoard, score: moveScore, moved } = moveFunction(board);
    
    if (moved) {
      const boardWithNewTile = addRandomTile(newBoard);
      setBoard(boardWithNewTile);
      setScore(prev => prev + moveScore);
    }
  }, [board, gameOver, won]);

  // Check game status
  useEffect(() => {
    if (hasWon(board)) {
      setWon(true);
    } else if (isGameOver(board)) {
      setGameOver(true);
    }
  }, [board]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver || won) return;

      const moveHandlers = {
        'ArrowLeft': () => handleMove(moveLeft),
        'ArrowRight': () => handleMove(moveRight),
        'ArrowUp': () => handleMove(moveUp),
        'ArrowDown': () => handleMove(moveDown),
      };

      if (moveHandlers[event.key]) {
        event.preventDefault();
        moveHandlers[event.key]();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove, gameOver, won]);

  return {
    board,
    score,
    gameOver,
    won,
    boardSize,
    handleMove: {
      left: () => handleMove(moveLeft),
      right: () => handleMove(moveRight),
      up: () => handleMove(moveUp),
      down: () => handleMove(moveDown),
    },
    initialize,
    setBoardSize
  };
};
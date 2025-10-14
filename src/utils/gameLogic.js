// Pure functional game logic
export const createEmptyBoard = (size = 4) => 
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

export const getEmptyCells = (board) => {
  const emptyCells = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        emptyCells.push({ row: rowIndex, col: colIndex });
      }
    });
  });
  return emptyCells;
};

export const addRandomTile = (board) => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return board;

  const newBoard = board.map(row => [...row]);
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  newBoard[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;

  return newBoard;
};

export const initializeGame = (size = 4) => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

// Functional matrix operations
const transpose = (matrix) => 
  matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

const reverseRow = (row) => [...row].reverse();

const slideAndMergeRow = (row) => {
  // Filter out zeros
  const nonZero = row.filter(cell => cell !== 0);
  const result = [];
  let score = 0;
  let i = 0;

  while (i < nonZero.length) {
    if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
      const mergedValue = nonZero[i] * 2;
      result.push(mergedValue);
      score += mergedValue;
      i += 2;
    } else {
      result.push(nonZero[i]);
      i += 1;
    }
  }

  // Pad with zeros
  while (result.length < row.length) {
    result.push(0);
  }

  return { row: result, score };
};

export const moveLeft = (board) => {
  let totalScore = 0;
  let moved = false;
  const newBoard = board.map(row => {
    const { row: newRow, score } = slideAndMergeRow(row);
    totalScore += score;
    if (JSON.stringify(row) !== JSON.stringify(newRow)) {
      moved = true;
    }
    return newRow;
  });

  return { board: newBoard, score: totalScore, moved };
};

export const moveRight = (board) => {
  const reversedBoard = board.map(row => reverseRow(row));
  const { board: newReversedBoard, score, moved } = moveLeft(reversedBoard);
  return { 
    board: newReversedBoard.map(row => reverseRow(row)), 
    score, 
    moved 
  };
};

export const moveUp = (board) => {
  const transposed = transpose(board);
  const { board: newTransposed, score, moved } = moveLeft(transposed);
  return { 
    board: transpose(newTransposed), 
    score, 
    moved 
  };
};

export const moveDown = (board) => {
  const transposed = transpose(board);
  const { board: newTransposed, score, moved } = moveRight(transposed);
  return { 
    board: transpose(newTransposed), 
    score, 
    moved 
  };
};

export const canMove = (board) => {
  // Check for empty cells
  if (getEmptyCells(board).length > 0) return true;

  // Check for possible merges
  const size = board.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const current = board[i][j];
      // Check right neighbor
      if (j < size - 1 && board[i][j + 1] === current) return true;
      // Check bottom neighbor
      if (i < size - 1 && board[i + 1][j] === current) return true;
    }
  }

  return false;
};

export const hasWon = (board) => 
  board.some(row => row.some(cell => cell === 2048));

export const isGameOver = (board) => !canMove(board);
# 2048 Game - React.js Implementation

A complete implementation of the popular 2048 game built with React.js using functional programming principles and modern React hooks.

![2048 Game](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Functional Programming](https://img.shields.io/badge/Functional-Programming-orange)

## 🎮 Live Demo

[Add your deployed link here after deployment]

## ✨ Features

- 🎯 *Pure Functional Programming* - Immutable state transformations
- 🎨 *Modern React* - Built with React 18, Hooks, and JSX
- 📱 *Responsive Design* - Works on desktop and mobile devices
- 👆 *Touch Controls* - Swipe gestures for mobile play
- ⌨ *Keyboard Controls* - Arrow keys for desktop play
- 🔧 *Configurable Board* - Dynamic board sizes (3x3 to 6x6)
- 📊 *Score Tracking* - Real-time score calculation
- 🏆 *Win/Lose Conditions* - Smart game state management
- 🔄 *Restart Functionality* - Easy game reset
- 🚀 *Zero Dependencies* - No external libraries required

## 🛠 Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Step-by-Step Installation

1. *Clone the repository*
   bash
   git clone https://github.com/your-username/2048-game.git
   cd 2048-game
   

2. *Install dependencies*
   bash
   npm install
   

3. *Start the development server*
   bash
   npm start
   

4. *Open your browser*
   Navigate to [http://localhost:3000](http://localhost:3000) to view the game.

### Alternative: Using Yarn

bash
git clone https://github.com/your-username/2048-game.git
cd 2048-game
yarn install
yarn start


## 🎮 How to Play

### Basic Rules

1. *Goal: Combine tiles with the same numbers to create a tile with the number **2048*
2. *Movement*: Slide all tiles in one of four directions (up, down, left, right)
3. *Merging*: When two tiles with the same number collide, they merge into their sum
4. *New Tiles*: After each move, a new tile (2 or 4) appears in a random empty spot
5. *Game Over*: The game ends when:
   - You create a tile with *2048* (You Win! 🎉)
   - No more moves are possible (Game Over 💀)

### Controls

#### Desktop
- *↑ Arrow Up*: Move tiles upward
- *↓ Arrow Down*: Move tiles downward
- *← Arrow Left*: Move tiles to the left
- *→ Arrow Right*: Move tiles to the right
- *R Key*: Restart the game

#### Mobile/Touch Devices
- *Swipe Up*: Move tiles upward
- *Swipe Down*: Move tiles downward
- *Swipe Left*: Move tiles to the left
- *Swipe Right*: Move tiles to the right
- *Tap "New Game"*: Restart the game

### Scoring

- *Merge Score*: When two tiles merge, their sum is added to your score
- *Example*: Merging two 8 tiles gives you 16 points
- *Best Score*: Your highest score is tracked during the session

### Strategy Tips

1. *Keep your largest tile in a corner* (usually bottom-right)
2. *Build sequences* in one direction
3. *Plan ahead* to avoid getting stuck
4. *Use all four directions* strategically
5. *Don't rush* - think before you move!

## 🏗 Implementation Details

### Architecture Overview


src/
├── components/          # React Components (.jsx)
│   ├── GameBoard.jsx   # Main game grid display
│   ├── Tile.jsx        # Individual tile component
│   ├── ScoreBoard.jsx  # Score display component
│   ├── GameControls.jsx# Control panel component
│   └── GameOver.jsx    # Game over modal component
├── hooks/              # Custom React Hooks
│   └── useGameLogic.js # Game state management hook
├── utils/              # Pure Functional Utilities
│   └── gameLogic.js    # Core game logic functions
├── App.jsx             # Root application component
└── index.js            # Application entry point


### Functional Programming Principles

#### 1. Pure Functions
All game logic functions are pure - same input always produces same output with no side effects:

javascript
// Pure function example
export const moveLeft = (board) => {
  const newBoard = [];
  let totalScore = 0;
  
  board.forEach(row => {
    const { row: newRow, score } = slideAndMergeRow(row);
    newBoard.push(newRow);
    totalScore += score;
  });
  
  return { board: newBoard, score: totalScore };
};


#### 2. Immutability
State is never mutated directly - always create new objects:

javascript
// Immutable update example
const addRandomTile = (board) => {
  const newBoard = board.map(row => [...row]); // Create copy
  // ... add tile to newBoard
  return newBoard; // Return new array
};


#### 3. Function Composition
Complex operations are built from simple, reusable functions:

javascript
// Function composition example
export const moveUp = (board) => {
  const transposed = transpose(board);
  const { board: newTransposed, score } = moveLeft(transposed);
  return { 
    board: transpose(newTransposed), 
    score 
  };
};


### Key Algorithms

#### 1. Tile Merging Algorithm
javascript
const slideAndMergeRow = (row) => {
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


#### 2. Move Validation
javascript
export const canMove = (board) => {
  // Check for empty cells
  if (getEmptyCells(board).length > 0) return true;

  // Check for possible merges
  const size = board.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const current = board[i][j];
      if (j < size - 1 && board[i][j + 1] === current) return true;
      if (i < size - 1 && board[i + 1][j] === current) return true;
    }
  }
  return false;
};


### React Patterns Used

#### 1. Custom Hook for State Management
javascript
export const useGameLogic = (initialSize = 4) => {
  const [board, setBoard] = useState(() => initializeGame(initialSize));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [boardSize, setBoardSize] = useState(initialSize);

  // ... state management logic
};


#### 2. Event Handling with useCallback
javascript
const handleMove = useCallback((moveFunction) => {
  if (gameOver || won) return;

  const { board: newBoard, score: moveScore, moved } = moveFunction(board);
  
  if (moved) {
    const boardWithNewTile = addRandomTile(newBoard);
    setBoard(boardWithNewTile);
    setScore(prev => prev + moveScore);
  }
}, [board, gameOver, won]);


### Data Structures

#### 1. Board Representation
javascript
// 2D array representing the game state
const board = [
  [0, 2, 0, 4],
  [0, 0, 8, 0],
  [2, 0, 0, 16],
  [0, 0, 4, 2]
];


#### 2. Game State Object
javascript
const gameState = {
  board: 2DArray,    // Current game board
  score: number,     // Current score
  gameOver: boolean, // Game over status
  won: boolean,      // Win status
  boardSize: number  // Current board size
};


## 🚀 Deployment

### Building for Production

bash
npm run build


This creates a build folder with optimized production files.

### Deployment Options

#### 1. Netlify (Recommended)
bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build


#### 2. Vercel
bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod


#### 3. GitHub Pages
bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/2048-game",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy


#### 4. Traditional Web Hosting
- Upload the contents of the build folder to your web server
- Ensure your server routes all requests to index.html

## 🔧 Customization

### Changing Board Size
Modify the board size in the game controls or update the default in App.jsx:

javascript
const { boardSize, setBoardSize } = useGameLogic(4); // Default 4x4


### Adding New Features

#### 1. Undo Functionality
javascript
const [history, setHistory] = useState([]);

const undo = useCallback(() => {
  if (history.length > 0) {
    const previousState = history[history.length - 1];
    setBoard(previousState.board);
    setScore(previousState.score);
    setHistory(history.slice(0, -1));
  }
}, [history]);


#### 2. High Score Persistence
javascript
// In useGameLogic hook
useEffect(() => {
  localStorage.setItem('2048-best-score', Math.max(score, bestScore));
}, [score, bestScore]);


#### 3. Animation Effects
javascript
// Add CSS transitions to Tile component
const tileStyle = {
  transition: 'all 0.15s ease-in-out',
  transform: merged ? 'scale(1.1)' : 'scale(1)'
};


## 🧪 Testing

### Running Tests
bash
npm test


### Test Structure
javascript
// Example test for game logic
import { moveLeft, initializeGame } from '../utils/gameLogic';

describe('Game Logic', () => {
  test('should merge tiles correctly', () => {
    const board = [[2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    const result = moveLeft(board);
    expect(result.board[0]).toEqual([4, 0, 0, 0]);
    expect(result.score).toBe(4);
  });
});


## 🐛 Troubleshooting

### Common Issues

1. *Game doesn't start*
   - Clear browser cache and reload
   - Check console for errors
   - Ensure all dependencies are installed

2. *Controls not working*
   - Click on the game board to ensure focus
   - Check if keyboard events are being captured
   - Verify touch events on mobile devices

3. *Performance issues*
   - The game is optimized, but very large boards (6x6+) may have slight delays
   - Ensure you're using a modern browser

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add amazing feature'
4. Push to the branch: git push origin feature/amazing-feature
5. Open a Pull Request

### Development Guidelines

- Follow React best practices
- Use functional programming principles
- Write pure functions for game logic
- Maintain component modularity
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original 2048 game by Gabriele Cirulli
- React.js team for the amazing framework
- Functional programming community for inspiration

## 📞 Support

If you have any questions or issues:

1. Check the [GitHub Issues](https://github.com/your-username/2048-game/issues)
2. Create a new issue with detailed description
3. Contact: [your-email@example.com]

---

*Happy Gaming!* 🎮

Built with ❤ using React.js and Functional Programming principles.

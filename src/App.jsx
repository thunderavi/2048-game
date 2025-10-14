import React, { useRef } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import GameOver from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';

const App = () => {
  const {
    board,
    score,
    gameOver,
    won,
    boardSize,
    handleMove,
    initialize,
    setBoardSize
  } = useGameLogic(4);

  const touchStart = useRef({ x: 0, y: 0 });

  const handleRestart = () => {
    initialize(boardSize);
  };

  const handleSizeChange = (newSize) => {
    setBoardSize(newSize);
    initialize(newSize);
  };

  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current.x || !touchStart.current.y) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const dx = touchEnd.x - touchStart.current.x;
    const dy = touchEnd.y - touchStart.current.y;
    const minSwipeDistance = 50;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (Math.abs(dx) > minSwipeDistance) {
        dx > 0 ? handleMove.right() : handleMove.left();
      }
    } else {
      // Vertical swipe
      if (Math.abs(dy) > minSwipeDistance) {
        dy > 0 ? handleMove.down() : handleMove.up();
      }
    }

    touchStart.current = { x: 0, y: 0 };
  };

  // --- Styles ---
  const appStyle = {
    textAlign: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#faf8ef',
    fontFamily: 'Arial, sans-serif'
  };

  // The container will now hold both "instructions" and "game area" side by side
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '30px', // space between instructions and game
    maxWidth: '900px',
    margin: '0 auto'
  };

  const gameAreaStyle = {
    maxWidth: '600px',
    flex: '1'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const titleStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    color: '#776e65',
    margin: 0
  };

  const instructionsStyle = {
    backgroundColor: '#bbada0',
    color: 'white',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '14px',
    width: '200px',
    textAlign: 'left'
  };

  return (
    <div style={appStyle}>
      <div style={containerStyle}>
        {/* Instructions on the LEFT */}
        <div style={instructionsStyle}>
          <p>
            <strong>How to play:</strong>
          </p>
          <p>Use arrow keys or swipe to move tiles.</p>
          <p>When two tiles with the same number touch, they merge into one!</p>
          <p>Try to reach 2048!</p>
        </div>

        {/* Game Area on the RIGHT */}
        <div style={gameAreaStyle}>
          <header style={headerStyle}>
            <h1 style={titleStyle}>2048</h1>
            <ScoreBoard score={score} />
          </header>

          <GameControls 
            onRestart={handleRestart}
            onSizeChange={handleSizeChange}
            boardSize={boardSize}
          />

          <div
            style={{ margin: '20px 0' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <GameBoard board={board} />
          </div>

          <GameOver 
            gameOver={gameOver}
            won={won}
            onRestart={handleRestart}
            score={score}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

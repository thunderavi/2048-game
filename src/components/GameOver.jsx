import React from 'react';

const GameOver = ({ gameOver, won, onRestart, score }) => {
  if (!gameOver && !won) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%'
  };

  const buttonStyle = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#8f7a66',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ color: '#776e65', marginBottom: '20px', fontSize: '32px' }}>
          {won ? 'You Win! 🎉' : 'Game Over! 💀'}
        </h2>
        <p style={{ color: '#776e65', marginBottom: '10px', fontSize: '18px' }}>
          {won ? 'Congratulations! You reached 2048!' : 'No more moves possible'}
        </p>
        <p style={{ color: '#8f7a66', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>
          Final Score: {score}
        </p>
        <button 
          style={buttonStyle}
          onClick={onRestart}
        >
          {won ? 'Play Again' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default GameOver;
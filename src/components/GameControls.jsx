import React from 'react';

const GameControls = ({ onRestart, onSizeChange, boardSize }) => {
  const containerStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    margin: '20px 0'
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
    transition: 'all 0.2s ease'
  };

  const sizeControlStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const selectStyle = {
    padding: '8px 12px',
    border: '2px solid #bbada0',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <button 
        style={buttonStyle}
        onClick={onRestart}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#7f6a56'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#8f7a66'}
      >
        New Game
      </button>
      
      <div style={sizeControlStyle}>
        <label style={{ color: '#776e65', fontWeight: 'bold' }}>
          Board Size:
        </label>
        <select 
          value={boardSize} 
          onChange={(e) => onSizeChange(parseInt(e.target.value))}
          style={selectStyle}
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
        </select>
      </div>
    </div>
  );
};

export default GameControls;
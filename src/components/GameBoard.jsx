import React from 'react';
import Tile from './Tile';

const GameBoard = ({ board }) => {
  const boardStyle = {
    backgroundColor: '#bbada0',
    borderRadius: '6px',
    padding: '10px',
    display: 'inline-block',
    margin: '20px'
  };

  const rowStyle = {
    display: 'flex',
    marginBottom: '10px'
  };

  const cellStyle = {
    width: '100px',
    height: '100px',
    marginRight: '10px',
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
    borderRadius: '6px'
  };

  return (
    <div style={boardStyle}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={rowStyle}>
          {row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              style={{ ...cellStyle, marginRight: colIndex === row.length - 1 ? 0 : '10px' }}
            >
              <Tile value={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
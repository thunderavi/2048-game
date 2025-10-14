import React from 'react';

const ScoreBoard = ({ score, bestScore = 0 }) => {
  const containerStyle = {
    display: 'flex',
    gap: '20px',
    margin: '20px 0'
  };

  const scoreStyle = {
    backgroundColor: '#bbada0',
    padding: '10px 20px',
    borderRadius: '6px',
    textAlign: 'center',
    minWidth: '100px'
  };

  const labelStyle = {
    color: '#eee4da',
    fontSize: '13px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

  const valueStyle = {
    color: 'white',
    fontSize: '25px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <div style={scoreStyle}>
        <div style={labelStyle}>Score</div>
        <div style={valueStyle}>{score}</div>
      </div>
      <div style={scoreStyle}>
        <div style={labelStyle}>Best</div>
        <div style={valueStyle}>{Math.max(score, bestScore)}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
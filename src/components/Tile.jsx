import React from 'react';

const Tile = ({ value }) => {
  const getTileStyle = () => {
    const colors = {
      0: { bg: '#cdc1b4', text: '#776e65' },
      2: { bg: '#eee4da', text: '#776e65' },
      4: { bg: '#ede0c8', text: '#776e65' },
      8: { bg: '#f2b179', text: '#f9f6f2' },
      16: { bg: '#f59563', text: '#f9f6f2' },
      32: { bg: '#f67c5f', text: '#f9f6f2' },
      64: { bg: '#f65e3b', text: '#f9f6f2' },
      128: { bg: '#edcf72', text: '#f9f6f2' },
      256: { bg: '#edcc61', text: '#f9f6f2' },
      512: { bg: '#edc850', text: '#f9f6f2' },
      1024: { bg: '#edc53f', text: '#f9f6f2' },
      2048: { bg: '#edc22e', text: '#f9f6f2' }
    };

    const style = colors[value] || { bg: '#3c3a32', text: '#f9f6f2' };
    
    const fontSize = value < 100 ? '35px' : 
                    value < 1000 ? '30px' : '25px';

    return {
      backgroundColor: style.bg,
      color: style.text,
      fontSize: fontSize,
      fontWeight: 'bold',
      width: '100px',
      height: '100px',
      borderRadius: '6px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      transition: 'all 0.1s ease-in-out'
    };
  };

  return (
    <div style={getTileStyle()}>
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Tile;
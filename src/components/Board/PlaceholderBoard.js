import React from 'react';

function PlaceholderBoard({ board }) {
  return (
    <div className="board square-placeholders-wrapper">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((square, squareIndex) => (
            <div className="square-placeholder" key={squareIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlaceholderBoard;

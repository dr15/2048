import React, { useCallback, useEffect } from 'react';
import {
  arrowKeys,
  combineBoardDown,
  combineBoardLeft,
  combineBoardRight,
  combineBoardUp,
  trimBoardDown,
  trimBoardLeft,
  trimBoardRight,
  trimBoardUp,
} from '../../utils/utils';
import useKeyPress from '../../hooks/useKeyPress';

function Board({ updateBoard, board, isFull }) {
  const clickUp = useKeyPress(arrowKeys.up);
  const clickDown = useKeyPress(arrowKeys.down);
  const clickLeft = useKeyPress(arrowKeys.left);
  const clickRight = useKeyPress(arrowKeys.right);

  const onClickUp = useCallback(() => {
    const trimmedBoard = trimBoardUp(board);
    const combinedBoard = combineBoardUp(trimmedBoard);
    const retrimmedBoard = trimBoardUp(combinedBoard);

    updateBoard(retrimmedBoard);
  }, [board, updateBoard]);

  const onClickDown = useCallback(() => {
    const trimmedBoard = trimBoardDown(board);
    const combinedBoard = combineBoardDown(trimmedBoard);
    const retrimmedBoard = trimBoardDown(combinedBoard);

    updateBoard(retrimmedBoard);
  }, [board, updateBoard]);

  const onClickLeft = useCallback(() => {
    const trimmedBoard = trimBoardLeft(board);
    const combinedBoard = combineBoardLeft(trimmedBoard);
    const retrimmedBoard = trimBoardLeft(combinedBoard);

    updateBoard(retrimmedBoard);
  }, [board, updateBoard]);

  const onClickRight = useCallback(() => {
    const trimmedBoard = trimBoardRight(board);
    const combinedBoard = combineBoardRight(trimmedBoard);
    const retrimmedBoard = trimBoardRight(combinedBoard);

    updateBoard(retrimmedBoard);
  }, [board, updateBoard]);

  useEffect(() => {
    if (clickUp) onClickUp();
  }, [clickUp]); // eslint-disable-line

  useEffect(() => {
    if (clickDown) onClickDown();
  }, [clickDown]); // eslint-disable-line

  useEffect(() => {
    if (clickLeft) onClickLeft();
  }, [clickLeft]); // eslint-disable-line

  useEffect(() => {
    if (clickRight) onClickRight();
  }, [clickRight]); // eslint-disable-line

  useEffect(() => {
    updateBoard();
  }, []); // eslint-disable-line

  return (
    <div className="board">
      {isFull ? <div className="game-over">GAME OVER</div> : null}
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((square, squareIndex) => (
            <div className={`square-${square}`} key={squareIndex}>
              {square ? square : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

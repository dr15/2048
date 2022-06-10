import React, { useCallback, useEffect } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
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

function Board({ updateBoard, board, isFull, animationUpdate }) {
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
    <Flipper flipKey={animationUpdate} spring={{ stiffness: 584, damping: 43 }}>
      <div className="board">
        <div className="board square-placeholders-wrapper">
          {board.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((square, squareIndex) => (
                <div className="square-placeholder" key={squareIndex} />
              ))}
            </div>
          ))}
        </div>
        {isFull ? <div className="game-over">GAME OVER</div> : null}
        {board.map((row, rowIndex) => (
          <Flipped key={rowIndex} flipId={rowIndex}>
            <div className="row">
              {row.map((square) => (
                <Flipped key={square.id} flipId={square.id}>
                  <div className={`square-${square.value}`}>
                    {square.value ? square.value : ''}
                  </div>
                </Flipped>
              ))}
            </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
  );
}

export default Board;

import React, { useCallback, useEffect } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import {
  arrowKeys,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onMoveUp,
} from '../../utils/utils';
import useKeyPress from '../../hooks/useKeyPress';
import PlaceholderBoard from './PlaceholderBoard';

function Board({ updateBoard, board, isFull, animationUpdate }) {
  const clickUp = useKeyPress(arrowKeys.up);
  const clickDown = useKeyPress(arrowKeys.down);
  const clickLeft = useKeyPress(arrowKeys.left);
  const clickRight = useKeyPress(arrowKeys.right);

  const onClickUp = useCallback(() => {
    updateBoard(onMoveUp(board));
  }, [board, updateBoard]);

  const onClickDown = useCallback(() => {
    updateBoard(onMoveDown(board));
  }, [board, updateBoard]);

  const onClickLeft = useCallback(() => {
    updateBoard(onMoveLeft(board));
  }, [board, updateBoard]);

  const onClickRight = useCallback(() => {
    updateBoard(onMoveRight(board));
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
        <PlaceholderBoard board={board} />
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

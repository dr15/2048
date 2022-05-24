import React, {useCallback, useEffect, useState} from "react";
import {
    arrowKeys,
    combineBoardDown,
    combineBoardUp,
    trimBoardDown,
    trimBoardUp
} from "./utils";
import useKeyPress from "../../hooks/useKeyPress";

function Board({updateBoard, board, isFull}) {
    const clickUp = useKeyPress(arrowKeys.up);
    const clickDown = useKeyPress(arrowKeys.down);
    const clickLeft = useKeyPress(arrowKeys.left);
    const clickRight = useKeyPress(arrowKeys.right);

    const onClickUp = useCallback(() => {
        const trimmedBoard = trimBoardUp(board);
        const combinedBoard = combineBoardUp(trimmedBoard);
        const retrimmedBoard = trimBoardUp(combinedBoard);

        updateBoard(retrimmedBoard);
    }, [board]);

    const onClickDown = useCallback(() => {
        const trimmedBoard = trimBoardDown(board);
        const combinedBoard = combineBoardDown(trimmedBoard);
        const retrimmedBoard = trimBoardDown(combinedBoard);

        updateBoard(retrimmedBoard);
    }, [board]);

    const onClickLeft = useCallback(() => {
    }, [board]);

    const onClickRight = useCallback(() => {
    }, [board]);

    useEffect(() => {
        console.log('clicked up');
        onClickUp();
    }, [clickUp]);

    useEffect(() => {
        console.log('clicked down');
        onClickDown();
    }, [clickDown]);

    useEffect(() => {
        console.log('clicked left');
    }, [clickLeft]);

    useEffect(() => {
        console.log('clicked right');
    }, [clickRight]);

    useEffect(() => {
        updateBoard();
    }, []);

    return (
        <div className="board">
            {isFull ? <div className="game-over">GAME OVER</div> : null}
            {board.map((row, rowIndex) =>
              <div className="row" key={rowIndex}>
                  {row.map((square, squareIndex) =>
                    <div className={`square-${square}`} key={squareIndex}>{square ? square : ''}</div>
                  )}
              </div>
            )}
        </div>
    );
}

export default Board;

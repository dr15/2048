import React, {useCallback, useEffect, useState} from "react";
import {
    arrowKeys,
    combineBoardDown,
    combineBoardLeft,
    combineBoardUp,
    trimBoardDown,
    trimBoardLeft,
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
        const trimmedBoard = trimBoardLeft(board);
        const combinedBoard = combineBoardLeft(trimmedBoard);
        const retrimmedBoard = trimBoardLeft(combinedBoard);

        updateBoard(retrimmedBoard);
    }, [board]);

    const onClickRight = useCallback(() => {
    }, [board]);

    useEffect(() => {
        if (clickUp) onClickUp();
    }, [clickUp]);

    useEffect(() => {
        if (clickDown) onClickDown();
    }, [clickDown]);

    useEffect(() => {
        if (clickLeft) onClickLeft();
    }, [clickLeft]);

    useEffect(() => {
        if (clickRight) onClickRight();
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

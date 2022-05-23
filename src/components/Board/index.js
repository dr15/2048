import React, {useCallback, useEffect, useState} from "react";
import {
    combineBoardDown,
    combineBoardUp,
    trimBoardDown,
    trimBoardUp
} from "./utils";

function Board({updateBoard, board, isFull}) {
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
        updateBoard();
    }, []);

    return (
        <div className="board" onClick={onClickDown}>
            <div className="game-over">{isFull ? 'GAME OVER' : null}</div>
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

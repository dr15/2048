import React, {useCallback, useEffect, useState} from "react";
import {cloneDeep} from "lodash";
import {baseValue, getRandomSquare, initialBoard, isBoardFull, trimBoardUp} from "./utils";

function Board() {
    const [board, setBoard] = useState(initialBoard);
    const [isFull, setIsFull] = useState(false);

    const updateBoard = useCallback((boardValues = board) => {
        if (isBoardFull(boardValues)) {
            setIsFull(true);
            return;
        }

        const newBoard = cloneDeep(boardValues);

        // add new random square
        const newSquare = getRandomSquare(newBoard);
        newBoard[newSquare[0]][newSquare[1]] = baseValue;

        // update board state
        setBoard(newBoard);
    }, []);

    const onClickUp = useCallback(() => {
        const trimmedBoard = trimBoardUp(board);

        updateBoard(trimmedBoard);
    }, [board]);

    const onClickDown = useCallback(() => {
    }, [board]);

    const onClickLeft = useCallback(() => {
    }, [board]);

    const onClickRight = useCallback(() => {
    }, [board]);

    useEffect(() => {
        updateBoard();
    }, []);

    return (
        <div className="board" onClick={onClickUp}>
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

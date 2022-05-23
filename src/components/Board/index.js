import React, {useCallback, useEffect, useState} from "react";
import {cloneDeep} from "lodash";
import {baseValue, getRandomSquare, initialBoard, isBoardFull} from "./utils";

function Board() {
    const [boardValues, setBoardValues] = useState(initialBoard);
    const [isFull, setIsFull] = useState(false);

    const updateBoard = useCallback((board = boardValues) => {
        if (isBoardFull(board)) {
            setIsFull(true);
            return;
        }

        const newBoard = cloneDeep(boardValues);

        // add new random square
        const newSquare = getRandomSquare(newBoard);
        newBoard[newSquare[0]][newSquare[1]] = baseValue;

        // update board state
        setBoardValues(newBoard);
    }, []);

    useEffect(() => {
        updateBoard();
    }, []);

    return (
        <div className="board">
            <div className="game-over">{isFull ? 'GAME OVER' : null}</div>
            {boardValues.map((row, rowIndex) =>
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

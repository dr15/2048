import React, {useCallback, useEffect, useState} from "react";
import {cloneDeep} from "lodash";

const initialBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const baseValue = 2;

function getRandomNumber(maxLimit = 4) {
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99
    return rand;
}

function boardHasEmpty(board) {
    return board.find(row => row.find(square => square === 0));
}

function Board() {
    const [boardValues, setBoardValues] = useState(initialBoard);
    const [isFull, setIsFull] = useState(false);

    const updateBoard = useCallback((board = boardValues) => {
        // if (!boardHasEmpty(board)) {setIsFull(true); return board};
        const x = getRandomNumber();
        const y = getRandomNumber();

        if (board[x][y] === 0) {
            const newBoard = cloneDeep(board);
            newBoard[x][y] = baseValue;
            setBoardValues(newBoard);
        } else (updateBoard(board));

    }, []);

    function getSquareDisplayValue(value) {
        return value > 0 ? value : '';
    }

    const shiftUp = useCallback(() => {
        const newBoard = cloneDeep(boardValues);
        newBoard.map((row, rowIndex) => {
            if (rowIndex === 0) return [...row];

            return row.map((square, index) => {
                if (square === 0) return 0;

                let nextEmpty = rowIndex;
                for (let i = rowIndex - 1; i >= 0; i--) {
                    if (newBoard[i][index] === 0) nextEmpty = i;
                }

                const aboveEmpty = nextEmpty - 1;
                const aboveEmptyExists = aboveEmpty >= 0;
                if (nextEmpty !== rowIndex || aboveEmptyExists ) {

                    if (aboveEmptyExists && newBoard[aboveEmpty][index] === square) {
                        newBoard[aboveEmpty][index] = square * 2;
                        newBoard[rowIndex][index] = 0;
                    } else {
                        newBoard[nextEmpty][index] = square;
                        newBoard[rowIndex][index] = 0;
                    }
                }

            });
        });

        updateBoard(newBoard);

    }, [boardValues]);

    useEffect(() => {
        updateBoard();
    }, []);

    return (
        <div className="board" onClick={shiftUp}>
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

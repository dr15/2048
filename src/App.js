import { useCallback, useState } from 'react';
import { cloneDeep } from 'lodash';
import Board from './components/Board';
import {
  areBoardsEqual,
  baseValue,
  createInitialBoard,
  getRandomSquare,
  isBoardFull,
  tallyScore,
} from './utils/utils';
import './App.css';

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [isFull, setIsFull] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [animationUpdate, setAnimationUpdate] = useState(false);

  const addRandomSquare = useCallback((board) => {
    const newBoard = cloneDeep(board);

    // add new random square
    const newSquare = getRandomSquare(newBoard);
    newBoard[newSquare[0]][newSquare[1]].value = baseValue;

    // update board state
    setBoard(newBoard);
    setIsFirstRun(false);
    setAnimationUpdate(!animationUpdate);
  }, []); // eslint-disable-line

  const updateBoard = useCallback(
    (boardValues = board) => {
      if (!isFirstRun && areBoardsEqual(boardValues, board)) {
        return;
      }

      if (isBoardFull(boardValues)) {
        setIsFull(true);
        return;
      }

      const newBoard = cloneDeep(boardValues);

      // update board state
      setBoard(newBoard);
      setAnimationUpdate(!animationUpdate);

      // add a new square after a delay
      setTimeout(() => {
        addRandomSquare(newBoard);
      }, 200);
    },
    [board, addRandomSquare], // eslint-disable-line
  );

  const setNewGame = useCallback(() => {
    updateBoard(createInitialBoard());
    setIsFull(false);
  }, [updateBoard]);

  return (
    <div className="App">
      <header>
        <h1>2048</h1>
        <div className="dashboard">
          <div>
            <div>score</div>
            <div>{tallyScore(board)}</div>
          </div>
          <button onClick={setNewGame}>new game</button>
        </div>
      </header>
      <Board
        board={board}
        updateBoard={updateBoard}
        isFull={isFull}
        animationUpdate={animationUpdate}
      />
    </div>
  );
}

export default App;

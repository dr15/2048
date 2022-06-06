import { useCallback, useState } from 'react';
import { cloneDeep } from 'lodash';
import Board from './components/Board';
import {
  areBoardsEqual,
  baseValue,
  getRandomSquare,
  initialBoard,
  isBoardFull,
  tallyScore,
} from './utils/utils';
import './App.css';

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isFull, setIsFull] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);

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

      // add new random square
      const newSquare = getRandomSquare(newBoard);
      newBoard[newSquare[0]][newSquare[1]] = baseValue;

      // update board state
      setBoard(newBoard);
      setIsFirstRun(false);
    },
    [board],
  );

  const setNewGame = useCallback(() => {
    updateBoard(initialBoard);
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
      <Board board={board} updateBoard={updateBoard} isFull={isFull} />
    </div>
  );
}

export default App;

import {useCallback, useState} from "react";
import {cloneDeep} from "lodash";
import Board from "./components/Board";
import {baseValue, getRandomSquare, initialBoard, isBoardFull, tallyScore} from "./utils/utils";
import './App.css';

function App() {
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

  const setNewGame = useCallback(() => {
    updateBoard(initialBoard);
    setIsFull(false);
  }, []);

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
      <Board board={board} updateBoard={updateBoard} isFull={isFull}/>
    </div>
  );
}

export default App;

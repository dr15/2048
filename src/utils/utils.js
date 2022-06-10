import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const createInitialBoard = (size = 4) => {
  return Array.from({ length: size }, (item, rowIndex) => {
    return Array.from({ length: size }, (item, squareIndex) => {
      return { value: 0, id: uuidv4() };
    });
  });
};

export const baseValue = 2;
export const arrowKeys = {
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
};

export function getRandomNumber(min = 0, max = 3) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isBoardFull(board) {
  return !board.some((row) => row.some((square) => square.value === 0));
}

export function getRandomSquare(board) {
  const x = getRandomNumber();
  const y = getRandomNumber();

  if (board[x][y].value === 0) {
    return [x, y];
  } else {
    return getRandomSquare(board);
  }
}

export function tallyScore(board) {
  return board.reduce(
    (previousValue, currentValue, currentIndex) =>
      previousValue +
      board[currentIndex].reduce((prevValue, currentValue) => {
        return prevValue + currentValue.value;
      }, 0),
    0,
  );
}

export function areBoardsEqual(board1, board2) {
  return board1.every((row, rowIndex) => {
    return row.every(
      (square, squareIndex) =>
        square.value === board2[rowIndex][squareIndex].value,
    );
  });
}

function getOperationVars(board, rowIndex, squareIndex) {
  const value = board[rowIndex][squareIndex].value;
  const squareHasValue = value > 0;

  /* above */
  const hasSquareAbove = rowIndex - 1 >= 0;
  const squareAbove = hasSquareAbove
    ? board[rowIndex - 1][squareIndex].value
    : 0;
  const hasEmptySquareAbove = hasSquareAbove && squareAbove === 0;
  const squareAboveHasValue =
    hasSquareAbove && board[rowIndex - 1][squareIndex].value > 0;

  /* below */
  const hasSquareBelow = rowIndex + 1 < board.length;
  const squareBelow = hasSquareBelow
    ? board[rowIndex + 1][squareIndex].value
    : 0;
  const hasEmptySquareBelow = hasSquareBelow && squareBelow === 0;
  const squareBelowHasValue =
    hasSquareBelow && board[rowIndex + 1][squareIndex].value > 0;

  /* left */
  const hasSquareToTheLeft = squareIndex - 1 >= 0;
  const squareToTheLeft = hasSquareToTheLeft
    ? board[rowIndex][squareIndex - 1].value
    : 0;
  const hasEmptySquareToTheLeft = hasSquareToTheLeft && squareToTheLeft === 0;
  const squareToTheLeftHasValue = hasSquareToTheLeft && squareToTheLeft > 0;

  /* right */
  const hasSquareToTheRight = squareIndex + 1 < board.length;
  const squareToTheRight = hasSquareToTheRight
    ? board[rowIndex][squareIndex + 1].value
    : 0;
  const hasEmptySquareToTheRight =
    hasSquareToTheRight && squareToTheRight === 0;
  const squareToTheRightHasValue = hasSquareToTheRight && squareToTheRight > 0;

  return {
    value,
    squareHasValue,
    hasSquareAbove,
    squareAbove,
    hasEmptySquareAbove,
    squareAboveHasValue,
    hasSquareBelow,
    squareBelow,
    hasEmptySquareBelow,
    squareBelowHasValue,
    hasSquareToTheLeft,
    squareToTheLeft,
    hasEmptySquareToTheLeft,
    squareToTheLeftHasValue,
    hasSquareToTheRight,
    squareToTheRight,
    hasEmptySquareToTheRight,
    squareToTheRightHasValue,
  };
}

/* UP */
function trimColumnUp(board, rowIndex, squareIndex) {
  const { value, squareHasValue, hasEmptySquareAbove } = getOperationVars(
    board,
    rowIndex,
    squareIndex,
  );

  if (squareHasValue && hasEmptySquareAbove) {
    board[rowIndex - 1][squareIndex] = {
      value,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
    trimColumnUp(board, rowIndex - 1, squareIndex);
  }

  if (rowIndex + 1 < board.length)
    trimColumnUp(board, rowIndex + 1, squareIndex);
}

export function trimBoardUp(board) {
  const newBoard = cloneDeep(board);

  const columns = Array.from({ length: newBoard.length }, (v, i) => 0);
  columns.forEach((column, columnIndex) => {
    trimColumnUp(newBoard, 0, columnIndex);
  });

  return newBoard;
}

function combineColumnUp(board, rowIndex, squareIndex) {
  const { value, squareHasValue, squareAbove, squareAboveHasValue } =
    getOperationVars(board, rowIndex, squareIndex);

  if (squareHasValue && squareAboveHasValue && value === squareAbove) {
    board[rowIndex - 1][squareIndex] = {
      value: value * 2,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = {
      value: 0,
      id: uuidv4(),
    };
  }

  if (rowIndex + 1 < board.length) {
    combineColumnUp(board, rowIndex + 1, squareIndex);
  }
}

export function combineBoardUp(board) {
  const newBoard = cloneDeep(board);

  const columns = Array.from({ length: newBoard.length }, (v, i) => 0);
  columns.forEach((column, columnIndex) => {
    combineColumnUp(newBoard, 0, columnIndex);
  });

  return newBoard;
}

/* DOWN */
function trimColumnDown(board, rowIndex, squareIndex) {
  const { value, squareHasValue, hasEmptySquareBelow } = getOperationVars(
    board,
    rowIndex,
    squareIndex,
  );

  if (squareHasValue && hasEmptySquareBelow) {
    board[rowIndex + 1][squareIndex] = {
      value,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
    trimColumnDown(board, rowIndex + 1, squareIndex);
  }

  if (rowIndex - 1 >= 0) trimColumnDown(board, rowIndex - 1, squareIndex);
}

export function trimBoardDown(board) {
  const newBoard = cloneDeep(board);
  const columns = Array.from({ length: newBoard.length }, (v, i) => 0);

  columns.forEach((column, columnIndex) => {
    trimColumnDown(newBoard, board.length - 1, columnIndex);
  });

  return newBoard;
}

function combineColumnDown(board, rowIndex, squareIndex) {
  const { value, squareHasValue, squareBelowHasValue, squareBelow } =
    getOperationVars(board, rowIndex, squareIndex);

  if (squareHasValue && squareBelowHasValue && value === squareBelow) {
    board[rowIndex + 1][squareIndex] = {
      value: value * 2,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
  }

  if (rowIndex - 1 >= 0) {
    combineColumnDown(board, rowIndex - 1, squareIndex);
  }
}

export function combineBoardDown(board) {
  const newBoard = cloneDeep(board);

  const columns = Array.from({ length: newBoard.length }, (v, i) => 0);
  columns.forEach((column, columnIndex) => {
    combineColumnDown(newBoard, board.length - 1, columnIndex);
  });

  return newBoard;
}

/* LEFT */
function trimRowLeft(board, rowIndex, squareIndex) {
  const { value, squareHasValue, hasEmptySquareToTheLeft } = getOperationVars(
    board,
    rowIndex,
    squareIndex,
  );

  if (squareHasValue && hasEmptySquareToTheLeft) {
    board[rowIndex][squareIndex - 1] = {
      value,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
    trimRowLeft(board, rowIndex, squareIndex - 1);
  }

  if (squareIndex + 1 < board.length)
    trimRowLeft(board, rowIndex, squareIndex + 1);
}

export function trimBoardLeft(board) {
  const newBoard = cloneDeep(board);
  const rows = Array.from({ length: newBoard.length }, (v, i) => 0);

  rows.forEach((row, rowIndex) => {
    trimRowLeft(newBoard, rowIndex, 0);
  });

  return newBoard;
}

function combineRowLeft(board, rowIndex, squareIndex) {
  const { value, squareHasValue, squareToTheLeftHasValue, squareToTheLeft } =
    getOperationVars(board, rowIndex, squareIndex);

  if (squareHasValue && squareToTheLeftHasValue && value === squareToTheLeft) {
    board[rowIndex][squareIndex - 1] = {
      value: value * 2,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
  }

  if (squareIndex + 1 < board.length) {
    combineRowLeft(board, rowIndex, squareIndex + 1);
  }
}

export function combineBoardLeft(board) {
  const newBoard = cloneDeep(board);

  const rows = Array.from({ length: newBoard.length }, (v, i) => 0);
  rows.forEach((row, rowIndex) => {
    combineRowLeft(newBoard, rowIndex, 0);
  });

  return newBoard;
}

/* RIGHT */
function trimRowRight(board, rowIndex, squareIndex) {
  const { value, squareHasValue, hasEmptySquareToTheRight } = getOperationVars(
    board,
    rowIndex,
    squareIndex,
  );

  if (squareHasValue && hasEmptySquareToTheRight) {
    board[rowIndex][squareIndex + 1] = {
      value,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
    trimRowRight(board, rowIndex, squareIndex + 1);
  }

  if (squareIndex - 1 >= 0) trimRowRight(board, rowIndex, squareIndex - 1);
}

export function trimBoardRight(board) {
  const newBoard = cloneDeep(board);
  const rows = Array.from({ length: newBoard.length }, (v, i) => 0);

  rows.forEach((row, rowIndex) => {
    trimRowRight(newBoard, rowIndex, board.length - 1);
  });

  return newBoard;
}

function combineRowRight(board, rowIndex, squareIndex) {
  const { value, squareHasValue, squareToTheLeftHasValue, squareToTheLeft } =
    getOperationVars(board, rowIndex, squareIndex);

  if (squareHasValue && squareToTheLeftHasValue && value === squareToTheLeft) {
    board[rowIndex][squareIndex - 1] = {
      value: value * 2,
      id: board[rowIndex][squareIndex].id,
    };
    board[rowIndex][squareIndex] = { value: 0, id: uuidv4() };
  }

  if (squareIndex + 1 < board.length) {
    combineRowRight(board, rowIndex, squareIndex + 1);
  }
}

export function combineBoardRight(board) {
  const newBoard = cloneDeep(board);

  const rows = Array.from({ length: newBoard.length }, (v, i) => 0);
  rows.forEach((row, rowIndex) => {
    combineRowRight(newBoard, rowIndex, 0);
  });

  return newBoard;
}

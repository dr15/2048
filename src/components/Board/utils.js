import {cloneDeep} from "lodash";

export const initialBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
export const baseValue = 2;

export function getRandomNumber(min = 0, max = 3) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isBoardFull(board) {
  return !board.some(row => row.some(square => square === 0))
}

export function getRandomSquare(board) {
  const x = getRandomNumber();
  const y = getRandomNumber();

  if (board[x][y] === 0) {
    return [x, y]
  } else {
    return getRandomSquare(board);
  }
}

/* UP */
function trimColumnUp(board, rowIndex, squareIndex) {
  const value = board[rowIndex][squareIndex];
  const squareHasValue = value > 0;
  const hasSquareAbove = rowIndex - 1 >= 0;
  const squareAbove = hasSquareAbove ? board[rowIndex - 1][squareIndex] : 0;
  const hasEmptySquareAbove = hasSquareAbove && squareAbove === 0;

  if (squareHasValue && hasEmptySquareAbove) {
    board[rowIndex - 1][squareIndex] = value;
    board[rowIndex][squareIndex] = 0;
    trimColumnUp(board, rowIndex - 1, squareIndex);
  }

  if (rowIndex + 1 < board.length) trimColumnUp(board, rowIndex + 1, squareIndex);
}

export function trimBoardUp(board) {
  const newBoard = cloneDeep(board);

  const columns = Array.from({length: newBoard.length}, (v, i) => 0);
  columns.forEach((column, columnIndex) => {
    trimColumnUp(newBoard, 0, columnIndex);
  })

  return newBoard;
}

function combineColumnUp(board, rowIndex, squareIndex) {
  const value = board[rowIndex][squareIndex];
  const squareHasValue = value > 0;
  const hasSquareAbove = rowIndex - 1 >= 0;
  const squareAbove = hasSquareAbove ? board[rowIndex - 1][squareIndex] : 0;
  const squareAboveHasValue = hasSquareAbove && board[rowIndex - 1][squareIndex] > 0;

  if (squareHasValue && squareAboveHasValue && value === squareAbove) {
    board[rowIndex - 1][squareIndex] = value * 2;
    board[rowIndex][squareIndex] = 0;
  }

  if (rowIndex + 1 < board.length) {
    combineColumnUp(board, rowIndex + 1, squareIndex);
  }
}

export function combineBoardUp(board) {
  const newBoard = cloneDeep(board);

  const columns = Array.from({length: newBoard.length}, (v, i) => 0);
  columns.forEach((column, columnIndex) => {
    combineColumnUp(newBoard, 0, columnIndex);
  })

  return newBoard;
}

/* DOWN */
function trimColumnDown(board, rowIndex, squareIndex) {
  const value = board[rowIndex][squareIndex];
  const squareHasValue = value > 0;
  const hasSquareBelow = rowIndex + 1 < board.length;
  const squareBelow = hasSquareBelow ? board[rowIndex + 1][squareIndex] : 0;
  const hasEmptySquareBelow = hasSquareBelow && squareBelow === 0;

  if (squareHasValue && hasEmptySquareBelow) {
    board[rowIndex + 1][squareIndex] = value;
    board[rowIndex][squareIndex] = 0;
    trimColumnDown(board, rowIndex + 1, squareIndex);
  }

  if (rowIndex - 1 >= 0) trimColumnDown(board, rowIndex - 1, squareIndex);
}

export function trimBoardDown(board) {
  const newBoard = cloneDeep(board);
  const columns = Array.from({length: newBoard.length}, (v, i) => 0);

  columns.forEach((column, columnIndex) => {
    trimColumnDown(newBoard, board.length - 1, columnIndex);
  })

  return newBoard;
}

import {useCallback} from "react";

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
export const MIN_BOARD_COLUMNS = 20;
export const MIN_BOARD_ROWS = 20;
export const MAX_BOARD_COLUMNS = 60;
export const MAX_BOARD_ROWS = 60;
export const INITIAL_SNAKE_SIZE = 5;

const boardWidth = Math.max(window.innerWidth, MIN_BOARD_COLUMNS * 10);
const boardHeight = Math.max(window.innerHeight, MIN_BOARD_ROWS * 10);

export const BOARD_COLUMNS = Math.min(Math.floor(boardWidth / 10), MAX_BOARD_COLUMNS);
export const BOARD_ROWS = Math.min(Math.floor(boardHeight / 10), MAX_BOARD_ROWS);
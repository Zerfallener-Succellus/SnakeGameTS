import { BOARD_COLUMNS, BOARD_ROWS, INITIAL_SNAKE_SIZE } from './consts.js';
import { isCoordenateEqualToLinear, randomCoordinate } from './helpers.js';
import { Coordinates } from "./types";

const pixels : HTMLDivElement[] = [];
let snakeCordinates : Coordinates[];
let foodCoordinate : Coordinates;





const setupBoard = (columns: number, rows: number) => {
  const board = document.getElementById('board') as HTMLDivElement;
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // add pixels to board
  for (let i = 0; i < columns * rows ; i++) {
   const pixel  = document.createElement('div');
   pixel.className = 'pixel';
   board.appendChild(pixel);
   pixels.push(pixel);
  }
};


const initializeSnake = (columns: number, rows:number): Coordinates[] => {
  const head : Coordinates = {x:Math.floor(columns/2) , y: Math.floor(rows/2)}
  
  const snake = [head];
  
  for (let i = 0; i < INITIAL_SNAKE_SIZE; i++) {
    const bodyCoordinate: Coordinates = {x: head.x - i, y: head.y};
    snake.push(bodyCoordinate);
  }

  return snake;
};


const generateFood = () => {
  foodCoordinate = randomCoordinate(BOARD_COLUMNS, BOARD_ROWS);
};

//Desenhar o tabuleiro
//Desenhar a cobra
//Desenhar a comida

const paint = () => {
  //Limpar o tabuleiro
pixels.forEach((pixel, linear) => {
 pixel.className = 'pixel';

  //Desenhar a cobra
  //Se a coordenada for pixel atual é igual a coodrdenada corpo cobra
  snakeCordinates.forEach(snakeCordinates => {
    if (isCoordenateEqualToLinear(snakeCordinates, linear, BOARD_COLUMNS)) {
      pixel.className = 'pixel snake';
    }
  });


  //Desenhar a comida
  
    if (isCoordenateEqualToLinear(foodCoordinate, linear, BOARD_COLUMNS)) {
      pixel.className = 'pixel food';
    }
  
});
}

setupBoard(BOARD_COLUMNS, BOARD_ROWS);

snakeCordinates = initializeSnake(BOARD_COLUMNS, BOARD_COLUMNS);

generateFood();

paint();


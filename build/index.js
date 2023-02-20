import { BOARD_COLUMNS, BOARD_ROWS, INITIAL_SNAKE_SIZE } from './consts.js';
import { isCoordenateEqualToLinear, randomCoordinate } from './helpers.js';
let direction = 'right';
const pixels = [];
let snakeCordinates;
let foodCoordinate;
let SnakeX;
let position;
//teste
const setupBoard = (columns, rows) => {
    const board = document.getElementById('board');
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    // add pixels to board
    for (let i = 0; i < columns * rows; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        board.appendChild(pixel);
        pixels.push(pixel);
    }
};
const initializeSnake = (columns, rows) => {
    const head = { x: (Math.floor(columns / 2)), y: Math.floor(rows / 2) };
    const snake = [head];
    for (let i = 0; i < INITIAL_SNAKE_SIZE; i++) {
        const bodyCoordinate = { x: head.x - i, y: head.y };
        snake.push(bodyCoordinate);
    }
    SnakeX = head.x;
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
    //mover a cobra na nova direção
};
const moveSnake = () => {
    // Meche a cabecinha uiui
    const head = snakeCordinates[0];
    if (direction === 'down') {
        snakeCordinates[0] = { x: head.x, y: head.y + 1 };
    }
    else if (direction === 'up') {
        snakeCordinates[0] = { x: head.x, y: head.y - 1 };
    }
    else if (direction === 'left') {
        snakeCordinates[0] = { x: head.x - 1, y: head.y };
    }
    else if (direction === 'right') {
        snakeCordinates[0] = { x: head.x + 1, y: head.y };
    }
    // Meche o corpinho aiai
    for (let i = snakeCordinates.length - 1; i > 0; i--) {
        const current = snakeCordinates[i];
        const prev = snakeCordinates[i - 1];
        snakeCordinates[i] = { x: prev.x, y: prev.y };
    }
    // Atualiza a posição do segundo segmento (posição 1) para a nova posição da cabeça da cobra
    snakeCordinates[1] = { x: head.x, y: head.y };
    // Desenha o quadro
    paint();
};
const seeCord = () => {
    console.log(snakeCordinates);
    console.log(direction);
};
//KB listener
setupBoard(BOARD_COLUMNS, BOARD_ROWS);
snakeCordinates = initializeSnake(BOARD_COLUMNS, BOARD_COLUMNS);
generateFood();
paint();
setInterval(moveSnake, 200);
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    if (event.code === "ArrowDown") {
        direction = 'down';
    }
    else if (event.code === "ArrowUp") {
        direction = 'up';
    }
    else if (event.code === "ArrowLeft") {
        direction = 'left';
    }
    else if (event.code === "ArrowRight") {
        direction = 'right';
    }
});

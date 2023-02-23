import { BOARD_COLUMNS, BOARD_ROWS, INITIAL_SNAKE_SIZE } from './consts.js';
import { isCoordenateEqualToLinear, randomCoordinate } from './helpers.js';
let direction = 'right';
const pixels = [];
let snakeCordinates;
let foodCoordinate;
let score = 0;
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
const grow = () => {
    const head = snakeCordinates[0];
    if (head.x === foodCoordinate.x && head.y === foodCoordinate.y) {
        const newSegment = { x: snakeCordinates[snakeCordinates.length - 1].x, y: snakeCordinates[snakeCordinates.length - 1].y };
        snakeCordinates.push(newSegment);
        generateFood();
        console.log('comeu');
        score += 10;
        document.getElementById('hud').innerText = `Score: ${score}`;
    }
};
const gameOver = () => {
    clearInterval(gameLoop);
    const message = `Game over! 
  Sua pontuação foi: ${score}`;
    const gameOverElement = document.createElement('div');
    gameOverElement.id = 'game-over';
    gameOverElement.innerHTML = `${message} `;
    const restartButton = document.createElement('button');
    restartButton.id = 'restart';
    restartButton.textContent = 'Restart';
    restartButton.onclick = () => {
        restart();
    };
    gameOverElement.appendChild(restartButton);
    document.body.appendChild(gameOverElement);
};
const restart = () => {
    console.log('CLICASTE PUTO?');
    snakeCordinates = initializeSnake(BOARD_COLUMNS, BOARD_COLUMNS);
    generateFood();
    paint();
    score = 0;
    gameLoop = setInterval(moveSnake, 200);
    document.getElementById('hud').innerText = `Score: ${score}`;
    const gameOverElement = document.getElementById('game-over');
    if (gameOverElement) {
        gameOverElement.remove();
    }
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
    // verifica se a cobra bateu na parede
    const headX = snakeCordinates[0].x;
    const headY = snakeCordinates[0].y;
    if (headX < 0 || headX >= BOARD_COLUMNS || headY < 0 || headY >= BOARD_ROWS) {
        gameOver();
        return;
    }
    // Verifica se a cabeça colidiu com o corpo
    for (let i = 1; i < snakeCordinates.length; i++) {
        const segment = snakeCordinates[i];
        if (segment.x === headX && segment.y === headY) {
            gameOver();
            return;
        }
    }
    // Meche o corpinho aiai
    for (let i = snakeCordinates.length - 1; i > 0; i--) {
        const current = snakeCordinates[i];
        const prev = snakeCordinates[i - 1];
        snakeCordinates[i] = { x: prev.x, y: prev.y };
    }
    // Atualiza a posição do segundo segmento (posição 1) para a nova posição da cabeça da cobra
    snakeCordinates[1] = { x: head.x, y: head.y };
    grow();
    // Desenha o quadro
    paint();
};
setupBoard(BOARD_COLUMNS, BOARD_ROWS);
snakeCordinates = initializeSnake(BOARD_COLUMNS, BOARD_COLUMNS);
generateFood();
paint();
let gameLoop = setInterval(moveSnake, 200);
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    if (event.code === "ArrowDown" && direction != 'up') {
        direction = 'down';
    }
    else if (event.code === "ArrowUp" && direction != 'down') {
        direction = 'up';
    }
    else if (event.code === "ArrowLeft" && direction != 'right') {
        direction = 'left';
    }
    else if (event.code === "ArrowRight" && direction != 'left') {
        direction = 'right';
    }
});

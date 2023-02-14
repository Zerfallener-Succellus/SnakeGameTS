const coordinateToLinear = (coord, columns) => coord.y * columns + coord.x;
export const isCoordenateEqualToLinear = (coord, linear, columns) => coordinateToLinear(coord, columns) === linear;
export const randomCoordinate = (columns, rows) => ({ x: Math.floor(Math.random() * columns), y: Math.floor(Math.random() * rows) });

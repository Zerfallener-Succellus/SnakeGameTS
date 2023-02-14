import { Coordinates } from './types.js';

const coordinateToLinear = (coord: Coordinates, columns: number): number => coord.y * columns + coord.x;

export const isCoordenateEqualToLinear = (coord: Coordinates, linear: number, columns: number): boolean => coordinateToLinear(coord, columns) === linear;

export  const randomCoordinate = (columns: number, rows: number): Coordinates => ({x: Math.floor(Math.random()* columns), y: Math.floor(Math.random() * rows)});

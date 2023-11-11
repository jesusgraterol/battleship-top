import Utilities from '../utilities';
import Ship from '../ship';
import Grid from '../grid';


/**
 * Builds and returns the instance of a Grid with the default ships.
 * @returns Grid
 */
function makeGrid() {
  return new Grid([
    [new Ship(4)],
    [new Ship(3), new Ship(3)],
    [new Ship(2), new Ship(2), new Ship(2)],
    [new Ship(1), new Ship(1), new Ship(1), new Ship(1)],
  ]);
}

/**
 * Queries the grid searching for a given query and returns the coordinates.
 * @param {*} gridState
 * @param {*} query
 * @param {?} shipLength
 * @returns object -> Array<{ row: number, column: number }>
 */
function queryGrid(gridState, query, shipLength = undefined) {
  let coordinates;
  while (coordinates === undefined) {
    // init the random coordinates that will be explored
    const row = Utilities.generateRandomInt(0, 9);
    const column = Utilities.generateRandomInt(0, 9);

    // Handle the query accordingly
    if (
      query === 'EMPTY_UNKNOWN'
      && gridState[row][column].state === 'UNKNOWN' && gridState[row][column].ship === undefined
    ) {
      coordinates = { row, column };
    } else if (
      query === 'SHIP_UNKNOWN'
      && shipLength === undefined
      && gridState[row][column].state === 'UNKNOWN' && gridState[row][column].ship !== undefined
    ) {
      coordinates = { row, column };
    } else if (
      query === 'SHIP_UNKNOWN'
      && typeof shipLength === 'number'
      && gridState[row][column].state === 'UNKNOWN'
      && gridState[row][column].ship !== undefined
      && gridState[row][column].ship.length === shipLength
    ) {
      coordinates = { row, column };
    }
  }
  return coordinates;
}

/**
 * Traverses the grid and finds all the coordinates occupied a given ship.
 * @param {*} id
 * @returns object -> Array<{ row: number, column: number }>
 */
function getShipCoordinates(gridState, id) {
  const coordinates = [];
  gridState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (
        gridState[rowIndex][columnIndex].ship
        && gridState[rowIndex][columnIndex].ship.id === id
      ) {
        coordinates.push({ row: rowIndex, column: columnIndex });
      }
    });
  });
  return coordinates;
}

export { makeGrid, queryGrid, getShipCoordinates };

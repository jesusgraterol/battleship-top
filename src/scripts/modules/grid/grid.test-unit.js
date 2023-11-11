import Utilities from '../utilities';
import Ship from '../ship';
import GridUtilities from './grid-utilities';
import Grid from './grid';

/**
 * Test Helpers
 */

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



/**
 * Grid Attack Management
 * Tests the calculation of the attack's result as well as keep the state in sync.
 */
describe('Grid Attack Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can attack an empty tile and process the state', () => {
    // init an instance
    const grid = makeGrid();

    // calculate the attack coordinates
    const atk = queryGrid(grid.state, 'EMPTY_UNKNOWN');

    // ensure the coordinate is currently pristine
    expect(grid.state[atk.row][atk.column].state).toBe('UNKNOWN');

    // execute the attack and ensure the state was properly updated and the result is valid
    const result = grid.processAttack(atk.row, atk.column);
    expect(grid.state[atk.row][atk.column].state).toBe('EMPTY');
    expect(typeof result).toBe('object');
    expect(result).toBeTruthy();
    expect(result.shipHit).toBe(false);
    expect(result.shipSunk).toBe(false);
  });

  test('can attack a ship and process the state of the ship and the adjacents', () => {
    const grid = makeGrid();
    const atk = queryGrid(grid.state, 'SHIP_UNKNOWN');

    // execute the attack and ensure the state was properly updated and the result is valid
    const result = grid.processAttack(atk.row, atk.column);
    expect(grid.state[atk.row][atk.column].state).toBe('HIT');
    expect(typeof result).toBe('object');
    expect(result).toBeTruthy();
    expect(result.shipHit).toBe(true);
    expect(result.shipSunk).toBe(false);

    // ensure the cross adjacents were modified
    const adjacentCoordinates = GridUtilities.getCrossAdjacentCoordinates(
      atk.row,
      atk.column,
      grid.state,
    );
    expect(
      adjacentCoordinates.every(
        (coord) => grid.state[coord.row][coord.column].state === 'DERIVED_EMPTY',
      ),
    ).toBe(true);
  });

  test('can attack a ship size 3 until it sinks and process the state of the ship and the adjacents', () => {
    const grid = makeGrid();
    const atk = queryGrid(grid.state, 'SHIP_UNKNOWN', 3);
    const coordinates = getShipCoordinates(grid.state, grid.state[atk.row][atk.column].ship.id);

    // iterate over each coordinate and ensure the state is updated
    const adjacentCoordinates = [];
    coordinates.forEach((coordinate, index) => {
      const result = grid.processAttack(coordinate.row, coordinate.column);
      expect(grid.state[coordinate.row][coordinate.column].state).toBe('HIT');
      expect(result.shipHit).toBe(true);
      expect(result.shipSunk).toBe(index === 2);
      adjacentCoordinates.push(GridUtilities.getCrossAdjacentCoordinates(
        coordinate.row,
        coordinate.column,
        grid.state,
      ));
      if (index < 2) {
        expect(grid.state[coordinate.row][coordinate.column].ship.isSunk()).toBe(false);
      } else {
        expect(grid.state[coordinate.row][coordinate.column].ship.isSunk()).toBe(true);
      }
    });

    // ensure the cross adjacents were modified
    expect(
      adjacentCoordinates.flat().every(
        (coord) => grid.state[coord.row][coord.column].state === 'DERIVED_EMPTY',
      ),
    ).toBe(true);
  });
});

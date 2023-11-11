import Utilities from '../utilities';
import Ship from '../ship';
import Grid from './grid';

/**
 * Grid Build
 * Tests all the functionality related to building a grid
 */
describe('Grid Build', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build a complete and blank grid (10 rows x 10 columns)', () => {
    const grid = new Grid([]);
    expect(grid.state.length).toBe(10);
    grid.state.forEach((cols) => {
      expect(cols.length).toBe(10);
    });
  });

  test('can build a grid with any number of ships and place them randomly', () => {
    // init the grid instance
    const ships = [
      [new Ship(4)],
      [new Ship(3), new Ship(3)],
      [new Ship(2), new Ship(2), new Ship(2)],
      [new Ship(1), new Ship(1), new Ship(1), new Ship(1)],
    ];
    const grid = new Grid(ships);

    // ensure the grid is valid given some ships were provided this time
    expect(grid.state.length).toBe(10);
    grid.state.forEach((cols) => {
      expect(cols.length).toBe(10);
    });

    // flatten the ships to simplify the interactions
    const flatShips = ships.flat();

    // Iterate over each ship and ensure it has been placed in the grid
    const assignedCoordinates = [];
    flatShips.forEach((ship) => {
      const shipCoordinates = [];
      grid.state.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          /**
           * when the ship is found, add it to the ship coordinates array and ensure it isn't
           * overlapping a different ship
           */
          if (
            grid.state[rowIndex][columnIndex].ship
            && grid.state[rowIndex][columnIndex].ship.id === ship.id
          ) {
            const encodedCoordinate = Utilities.encodeCoordinate(rowIndex, columnIndex);
            shipCoordinates.push(encodedCoordinate);
            expect(assignedCoordinates.includes(encodedCoordinate)).toBe(false);
            assignedCoordinates.push(encodedCoordinate);
          }
        });
      });

      // ensure the ship's parts were all included
      expect(ship.length).toBe(shipCoordinates.length);
    });

    // the total number of assigned coordinates, must match the accumulated length of all ships
    const correctCount = flatShips.reduce((accum, current) => accum + current.length, 0);
    expect(correctCount).toBe(assignedCoordinates.length);
  });
});

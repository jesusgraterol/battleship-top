import Utilities from '../utilities';
import Ship from '../ship';
import GridBuild from './grid-build';

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
    const grid = GridBuild.buildRandomGrid([]);
    expect(grid.length).toBe(10);
    grid.forEach((cols) => {
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
    const grid = GridBuild.buildRandomGrid(ships);

    // ensure the grid is valid given some ships were provided this time
    expect(grid.length).toBe(10);
    grid.forEach((cols) => {
      expect(cols.length).toBe(10);
    });

    // flatten the ships to simplify the interactions
    const flatShips = ships.flat();

    // Iterate over each ship and ensure it has been placed in the grid
    const assignedCoordinates = [];
    flatShips.forEach((ship) => {
      const shipCoordinates = [];
      grid.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          /**
           * when the ship is found, add it to the ship coordinates array and ensure it isn't
           * overlapping a different ship
           */
          if (
            grid[rowIndex][columnIndex].ship
            && grid[rowIndex][columnIndex].ship.id === ship.id
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

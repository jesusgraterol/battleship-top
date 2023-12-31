import Utilities from '../utilities';
import GridUtilities from './grid-utilities';





/**
 * Test Helpers
 */

/**
 * Given a list of coordinates representing the actual result and what is expected, it will encode
 * them and compare them.
 * @param {*} expectFunc
 * @param {*} result
 * @param {*} expected
 */
function compareExpectedVsResult(expectFunc, result, expected) {
  // convert the coordinates into lists of encoded strings
  const resultEnc = result.map((coord) => Utilities.encodeCoordinate(coord.row, coord.column));
  const expectedEnc = expected.map((coord) => Utilities.encodeCoordinate(
    coord.row,
    coord.column,
  ));

  // ensure the two lists are identical
  expectFunc(resultEnc.length).toBe(expectedEnc.length);
  expectFunc(resultEnc.sort()).toEqual(expectedEnc.sort());
}

/**
 * Given a set of a coordinates and the expected result, it peforms a test on the
 * getAdjacentCoordinates function.
 * @param {*} expectFunc
 * @param {*} rowIndex
 * @param {*} columnIndex
 * @param {*} expectedResults
 */
function testGetAdjacentCoordinates(expectFunc, rowIndex, columnIndex, expectedResults) {
  // init values
  const grid = GridUtilities.buildBlankGrid();
  const adjacent = GridUtilities.getAdjacentCoordinates(rowIndex, columnIndex, grid);

  // perform the test
  compareExpectedVsResult(expectFunc, adjacent, expectedResults);
}

/**
 * Given a set of a coordinates and the expected result, it peforms a test on the
 * getCrossAdjacentCoordinates function.
 * @param {*} expectFunc
 * @param {*} rowIndex
 * @param {*} columnIndex
 * @param {*} expectedResults
 */
function testGetCrossAdjacentCoordinates(expectFunc, rowIndex, columnIndex, expectedResults) {
  // init values
  const grid = GridUtilities.buildBlankGrid();
  const adjacent = GridUtilities.getCrossAdjacentCoordinates(rowIndex, columnIndex, grid);

  // perform the test
  compareExpectedVsResult(expectFunc, adjacent, expectedResults);
}

/**
 * Given a set of coordinates and the expected result, it performs a test on the
 * getLinearAdjacentCoordinates function.
 * @param {*} expectFunc
 * @param {*} rowIndex
 * @param {*} columnIndex
 * @param {*} expectedResults
 */
function testGetLinearAdjacentCoordinates(expectFunc, rowIndex, columnIndex, expectedResults) {
  // init values
  const grid = GridUtilities.buildBlankGrid();
  const adjacent = GridUtilities.getLinearAdjacentCoordinates(rowIndex, columnIndex, grid);

  // perform the test
  compareExpectedVsResult(expectFunc, adjacent, expectedResults);
}



/**
 * Grid Scanning
 * Tests all the helper functions focused on scanning the grid.
 */
describe('Grid Scanning Utilities', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  /* ****************************
   * Get Adjacement Coordinates *
   **************************** */

  test('can identify the adjacent grid tiles for a given coordinate (1: r4_c4)', () => {
    testGetAdjacentCoordinates(expect, 4, 4, [
      { row: 3, column: 4 },
      { row: 3, column: 5 },
      { row: 4, column: 5 },
      { row: 5, column: 5 },
      { row: 5, column: 4 },
      { row: 5, column: 3 },
      { row: 4, column: 3 },
      { row: 3, column: 3 },
    ]);
  });

  test('can identify the adjacent grid tiles for a given coordinate (2: r0_c0)', () => {
    testGetAdjacentCoordinates(expect, 0, 0, [
      { row: 0, column: 1 },
      { row: 1, column: 1 },
      { row: 1, column: 0 },
    ]);
  });

  test('can identify the adjacent grid tiles for a given coordinate (3: r9_c9)', () => {
    testGetAdjacentCoordinates(expect, 9, 9, [
      { row: 9, column: 8 },
      { row: 8, column: 8 },
      { row: 8, column: 9 },
    ]);
  });

  test('can identify the adjacent grid tiles for a given coordinate (4: r0_c4)', () => {
    testGetAdjacentCoordinates(expect, 0, 4, [
      { row: 0, column: 5 },
      { row: 1, column: 5 },
      { row: 1, column: 4 },
      { row: 1, column: 3 },
      { row: 0, column: 3 },
    ]);
  });

  test('can identify the adjacent grid tiles for a given coordinate (4: r9_c4)', () => {
    testGetAdjacentCoordinates(expect, 9, 4, [
      { row: 9, column: 3 },
      { row: 8, column: 3 },
      { row: 8, column: 4 },
      { row: 8, column: 5 },
      { row: 9, column: 5 },
    ]);
  });





  /* **********************************
   * Get Cross Adjacement Coordinates *
   ********************************** */

  test('can identify the cross adjacent grid tiles for a given coordinate (1: r4_c4)', () => {
    testGetCrossAdjacentCoordinates(expect, 4, 4, [
      { row: 3, column: 3 },
      { row: 3, column: 5 },
      { row: 5, column: 5 },
      { row: 5, column: 3 },
    ]);
  });

  test('can identify the cross adjacent grid tiles for a given coordinate (2: r0_c0)', () => {
    testGetCrossAdjacentCoordinates(expect, 0, 0, [
      { row: 1, column: 1 },
    ]);
  });

  test('can identify the cross adjacent grid tiles for a given coordinate (3: r0_c4)', () => {
    testGetCrossAdjacentCoordinates(expect, 0, 4, [
      { row: 1, column: 3 },
      { row: 1, column: 5 },
    ]);
  });

  test('can identify the cross adjacent grid tiles for a given coordinate (4: r9_c4)', () => {
    testGetCrossAdjacentCoordinates(expect, 9, 4, [
      { row: 8, column: 3 },
      { row: 8, column: 5 },
    ]);
  });





  /* **********************************
   * Get Linear Adjacement Coordinates *
   ********************************** */

  test('can identify the linear adjacent grid tiles for a given coordinate (1: r4_c4)', () => {
    testGetLinearAdjacentCoordinates(expect, 4, 4, [
      { row: 3, column: 4 },
      { row: 4, column: 5 },
      { row: 5, column: 4 },
      { row: 4, column: 3 },
    ]);
  });

  test('can identify the linear adjacent grid tiles for a given coordinate (2: r0_c0)', () => {
    testGetLinearAdjacentCoordinates(expect, 0, 0, [
      { row: 0, column: 1 },
      { row: 1, column: 0 },
    ]);
  });

  test('can identify the linear adjacent grid tiles for a given coordinate (3: r0_c4)', () => {
    testGetLinearAdjacentCoordinates(expect, 0, 4, [
      { row: 0, column: 5 },
      { row: 1, column: 4 },
      { row: 0, column: 3 },
    ]);
  });

  test('can identify the linear adjacent grid tiles for a given coordinate (4: r9_c4)', () => {
    testGetLinearAdjacentCoordinates(expect, 9, 4, [
      { row: 9, column: 3 },
      { row: 8, column: 4 },
      { row: 9, column: 5 },
    ]);
  });
});





/**
 * Grid Build Utilities
 * Tests all the helper functions developed to simplify the grid building.
 */
describe('Grid Build Utilities', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build a complete and blank grid (10 rows x 10 columns)', () => {
    const grid = GridUtilities.buildBlankGrid();
    expect(grid.length).toBe(10);
    grid.forEach((cols) => {
      expect(cols.length).toBe(10);
      cols.forEach((col) => {
        expect(col).toEqual({ state: 'UNKNOWN', ship: undefined });
      });
    });
  });
});

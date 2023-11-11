import GridUtilities from './grid-utilities';
import { makeGrid, queryGrid, getShipCoordinates } from '../test-helpers';

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
    const atk = queryGrid(grid.state, 'SHIP_UNKNOWN', 3);

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

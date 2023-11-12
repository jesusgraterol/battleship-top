import Gameboard from './gameboard';
import { queryGrid, getShipCoordinates } from '../test-helpers';

// Mock the renderer so no DOM errors are thrown
jest.mock('./gameboard-renderer');

describe('Attacks Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can attack an empty tile and not allow an attack on the same spot', () => {
    // init an instance
    const board = new Gameboard(true);

    // calculate the attack coordinates
    const atk = queryGrid(board.grid.state, 'EMPTY_UNKNOWN');

    // ensure the current coordinate to be attackable
    expect(board.canReceiveAttack(atk.row, atk.column)).toBe(true);

    // receive the attack and check the spot again
    const result = board.receiveAttack(atk.row, atk.column);
    expect(board.canReceiveAttack(atk.row, atk.column)).toBe(false);

    // validate the attack result
    expect(result.shipHit).toBe(false);
    expect(result.shipSunk).toBe(false);
    expect(result.gameboardDestroyed).toBe(false);
  });

  test('cannot attack the same spot twice', () => {
    // init an instance
    const board = new Gameboard(true);

    // calculate the attack coordinates
    const atk = queryGrid(board.grid.state, 'EMPTY_UNKNOWN');

    // ensure the current coordinate to be attackable
    expect(board.canReceiveAttack(atk.row, atk.column)).toBe(true);
    board.receiveAttack(atk.row, atk.column);
    expect(board.canReceiveAttack(atk.row, atk.column)).toBe(false);

    // attempt to attack the same spot
    expect(() => board.receiveAttack(atk.row, atk.column)).toThrow('An attack cannot be received at:');
  });

  test('can attack and completely destroy the board', () => {
    // init an instance
    const board = new Gameboard(true);

    // iterate and destroy all ships
    let lastResult;
    board.ships.flat().forEach((ship) => {
      getShipCoordinates(board.grid.state, ship.id).forEach((coord) => {
        lastResult = board.receiveAttack(coord.row, coord.column);
      });
    });

    // confirm the gameboard has been destroyed
    expect(lastResult.gameboardDestroyed).toBe(true);
  });
});

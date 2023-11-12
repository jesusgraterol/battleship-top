import Machine from '../machine';
import Player from './player';

// Mock the renderer so no DOM errors are thrown
jest.mock('../gameboard/gameboard-renderer');





/**
 * Test Helpers
 */

/**
 * Creates a fake target object with the getAttribute function that returns the
 * provided returnValue.
 * @param {*} returnValue
 * @returns object
 */
function fakeEvent(returnValue) {
  return {
    target: { getAttribute: () => returnValue },
  };
}





describe('Player Attack Decoding', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can decode a valid attack', () => {
    const machine = new Machine();
    const player = new Player();
    expect(player.decodeAttack(fakeEvent('r4_c4'), machine.gameboard)).toEqual({ row: 4, column: 4 });
  });

  test('cannot decode n invalid attack', () => {
    const machine = new Machine();
    const player = new Player();
    expect(player.decodeAttack(fakeEvent('asdd'), machine.gameboard)).toEqual(undefined);
    expect(player.decodeAttack(fakeEvent('a1_c3'), machine.gameboard)).toEqual(undefined);
    expect(player.decodeAttack(fakeEvent(null), machine.gameboard)).toEqual(undefined);
    expect(player.decodeAttack(fakeEvent(undefined), machine.gameboard)).toEqual(undefined);
  });

  test('cannot decode an attack that has already taken place', () => {
    const machine = new Machine();
    const player = new Player();
    machine.gameboard.receiveAttack(4, 4);
    expect(player.decodeAttack(fakeEvent('r4_c4'), machine.gameboard)).toEqual(undefined);
  });
});

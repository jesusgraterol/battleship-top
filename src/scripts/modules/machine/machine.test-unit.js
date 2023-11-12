import Player from '../player';
import Machine from './machine';

// Mock the renderer so no DOM errors are thrown
jest.mock('../gameboard/gameboard-renderer');

describe('Machine Attack Generation', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate a valid attack and broadcast it on the player gameboard', () => {
    const machine = new Machine();
    const player = new Player();
    const atk = machine.generateAttack(player.gameboard);

    // execute the attack
    player.gameboard.receiveAttack(atk.row, atk.column);

    // confirm the state was updated
    expect(player.gameboard.grid.state[atk.row][atk.column].state).not.toBe('UNKNOWN');
  });
});

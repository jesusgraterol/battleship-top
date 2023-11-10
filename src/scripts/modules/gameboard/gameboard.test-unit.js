import Gameboard from './gameboard';

// Mock the renderer so no DOM errors are thrown
jest.mock('./gameboard-renderer');

describe('Gameboard Instantiation', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can instantiate a gameboard and build the ships correctly', () => {
    const board = new Gameboard(false);
    expect(board.ships.length).toBe(4);

    expect(board.ships[0].length).toBe(1);
    expect(board.ships[0][0].length).toBe(4);

    expect(board.ships[1].length).toBe(2);
    expect(board.ships[1][0].length).toBe(3);
    expect(board.ships[1][1].length).toBe(3);

    expect(board.ships[2].length).toBe(3);
    expect(board.ships[2][0].length).toBe(2);
    expect(board.ships[2][1].length).toBe(2);
    expect(board.ships[2][2].length).toBe(2);

    expect(board.ships[3].length).toBe(4);
    expect(board.ships[3][0].length).toBe(1);
    expect(board.ships[3][1].length).toBe(1);
    expect(board.ships[3][2].length).toBe(1);
    expect(board.ships[3][3].length).toBe(1);
  });

  
});

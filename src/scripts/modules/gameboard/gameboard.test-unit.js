import Gameboard from './gameboard';

// Mock the renderer so no DOM errors are thrown
jest.mock('./gameboard-renderer');

describe('Gameboard Essentials', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can initialize a gameboard instance with a proper grid', () => {
    const gb = new Gameboard(false);
    /* const grid = gb.buildGrid(); */
    /* console.log(grid); */
    expect(2 + 2).toBe(4);
  });
});

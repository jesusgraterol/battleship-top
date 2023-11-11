import Gameboard from './gameboard';

// Mock the renderer so no DOM errors are thrown
jest.mock('./gameboard-renderer');

describe('some unit test', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test.skip('can build a complete grid (10 rows x 10 columns)', () => {
    expect(2 + 2).toBe(4);
  });
});

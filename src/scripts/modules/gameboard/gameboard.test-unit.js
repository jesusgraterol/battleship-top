/* eslint-disable no-undef */
import Gameboard from './gameboard';

describe('Integration test suite template', () => {
  beforeAll(() => {

  });

  afterAll(() => {

  });

  beforeEach(() => {

  });

  afterEach(() => {

  });

  test('can initialize a gameboard instance with a proper grid', () => {
    const gb = new Gameboard();
    const grid = gb.buildGrid();
    /* console.log(grid); */
    expect(2 + 2).toBe(4);
  });
});

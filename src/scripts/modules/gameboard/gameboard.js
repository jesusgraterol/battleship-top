import Utilities from '../utilities';

/**
 * Gameboard Class
 * ...
 */
class Gameboard {
  // the size of the grid for both axes
  #gridSize = 10;

  // the grid multi-dimensional array
  #grid;

  constructor() {

  }



  initialize() {
    
  }


  buildGrid() {
    const grid = [];
    for (let x = 0; x < this.#gridSize; x += 1) {
      grid[x] = [];
      for (let y = 0; y < this.#gridSize; y += 1) {
        grid[x][y] = {
          state: 'PRISTINE',
          ship: undefined,
        };
      }
    }
    return grid;
  }
}

/**
 * Module Exports
 */
export default Gameboard;

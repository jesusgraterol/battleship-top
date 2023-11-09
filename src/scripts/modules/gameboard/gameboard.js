import Utilities from '../utilities';

/**
 * Gameboard Class
 * ...
 */
class Gameboard {
  constructor() {

  }



  initialize() {
    
  }


  buildGrid() {
    const grid = [];
    for (let row = 0; row < 10; row += 1) {
      grid[row] = [];
      for (let column = 0; column < 10; column += 1) {
        grid[row][column] = {
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

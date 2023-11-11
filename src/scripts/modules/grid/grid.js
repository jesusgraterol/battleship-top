import Utilities from '../utilities';
import GridBuild from './grid-build';
import GridUtilities from './grid-utilities';

/**
 * Grid Class
 * Handles the creation of a grid as well as a series of functionalities that simplifies the
 * gameboard's work.
 */
class Grid {
  // the current state of the grid
  #state;

  constructor(ships) {
    // init the state
    this.#state = GridBuild.buildRandomGrid(ships);
  }

  /* *********
   * Getters *
   ********* */
  get state() {
    return this.#state;
  }
}




/**
 * Module Exports
 */
export default Grid;

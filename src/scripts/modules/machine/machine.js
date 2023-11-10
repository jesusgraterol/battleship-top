import Gameboard from '../gameboard';

/**
 * Machine Class
 * ...
 */
class Machine {
  // the gameboard instance
  gameboard;

  constructor() {
    // init the instance of the gameboard
    this.gameboard = new Gameboard(false);
  }
}




/**
 * Module Exports
 */
export default Machine;

import Gameboard from '../gameboard';

/**
 * Player Class
 * ...
 */
class Player {
  // the gameboard instance
  gameboard;

  constructor() {
    // init the instance of the gameboard
    this.gameboard = new Gameboard(true);
  }
}




/**
 * Module Exports
 */
export default Player;

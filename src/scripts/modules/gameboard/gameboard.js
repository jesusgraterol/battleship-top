import Utilities from '../utilities';
import GameboardRenderer from './gameboard-renderer';
import Ship from '../ship';
import Grid from '../grid';

/**
 * Gameboard Class
 * Handles the grid functionalities for a participant.
 */
class Gameboard {
  // the instance of renderer
  #renderer;

  // the ship instances by kind
  #ships;

  // the grid instance
  #grid;

  constructor(isPlayer) {
    // init the renderer
    this.#renderer = new GameboardRenderer(isPlayer);

    // init the ship instances
    this.#ships = [
      [new Ship(4)],
      [new Ship(3), new Ship(3)],
      [new Ship(2), new Ship(2), new Ship(2)],
      [new Ship(1), new Ship(1), new Ship(1), new Ship(1)],
    ];

    // init the grid instance
    this.#grid = new Grid(this.#ships);

    // render the gameboard
    this.#renderer.render(this.#ships, this.#grid.state);
  }

  /* *********
   * Getters *
   ********* */
  get ships() {
    return this.#ships;
  }

  get grid() {
    return this.#grid;
  }
}





/**
 * Module Exports
 */
export default Gameboard;

import Utilities from '../utilities';
import Ship from '../ship';
import GameboardRenderer from './gameboard-renderer';

/**
 * Gameboard Class
 * Handles the grid functionalities for a participant.
 */
class Gameboard {
  // the owner of the gameboard
  #isPlayer;

  // the instance of renderer
  #renderer;

  // the ship instances by kind
  #ships;

  // the grid array
  #grid;

  constructor(isPlayer) {
    // init the owner of the board
    this.#isPlayer = isPlayer;

    // init the renderer
    this.#renderer = new GameboardRenderer(this.#isPlayer);

    // init the ship instances
    this.#ships = Gameboard.#buildShipInstances();

    // init the grid array
    this.#grid = Gameboard.#buildGrid(this.#ships);

    // render the gameboard
    this.#renderer.render(this.#ships, this.#grid);
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





  /* **************
   * Ship Helpers *
   ************** */

  /**
   * Builds the instances for all the ships for the active gameboard.
   * @returns object -> Array<Array<Ship>>
   */
  static #buildShipInstances() {
    return [
      [new Ship(4)],
      [new Ship(3), new Ship(3)],
      [new Ship(2), new Ship(2), new Ship(2)],
      [new Ship(1), new Ship(1), new Ship(1), new Ship(1)],
    ];
  }





  /* **************
   * Grid Helpers *
   ************** */

  static #buildGrid(ships) {
    return Gameboard.#buildBlankGrid();
  }

  /**
   * Builds a grid in blank|pristine state ready for ships to be positioned.
   * @returns object -> Array<Array<object>>
   */
  static #buildBlankGrid() {
    const grid = [];
    for (let row = 0; row < 10; row += 1) {
      grid[row] = [];
      for (let column = 0; column < 10; column += 1) {
        grid[row][column] = {
          state: 'UNKNOWN',
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

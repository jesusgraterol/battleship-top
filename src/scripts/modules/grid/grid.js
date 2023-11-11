import Utilities from '../utilities';
import GridBuild from './grid-build';
import GridUtilities from './grid-utilities';

/**
 * Grid Class
 * Handles the grid's build as well as the interactions with the gameboard. It also keeps
 * the state up-to-date.
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




  /* ****************
   * Attack Handler *
   **************** */

  /**
   * Calculates the result of the attack and updates the state accordingly.
   * @param {*} row
   * @param {*} column
   * @returns object -> { shipHit: boolean, shipSunk: boolean }
   */
  processAttack(row, column) {
    // init values
    let attackResult = { shipHit: false, shipSunk: false };

    // handle the attack based on the content of the coordinate
    if (this.#state[row][column].ship) {
      attackResult = this.#onShipHit(row, column);
    } else {
      this.#state[row][column].state = 'EMPTY';
    }

    // finally, return the result of the attack
    return attackResult;
  }

  /**
   * Handles the after effects of a successful attack and returns its results.
   * @param {*} row
   * @param {*} column
   * @returns object -> { shipHit: boolean, shipSunk: boolean }
   */
  #onShipHit(row, column) {
    // hit the ship and set it on the state
    this.#state[row][column].ship.hit();
    this.#state[row][column].state = 'HIT';

    // Build the attack result
    const attackResult = {
      shipHit: true,
      shipSunk: this.#state[row][column].ship.isSunk(),
    };

    // Mark the derived empty based on the result of the attack
    this.#markDerivedEmpty(row, column, attackResult.shipSunk);

    // finally, return the result
    return attackResult;
  }

  #markDerivedEmpty(row, column, shipSunk) {

  }
}




/**
 * Module Exports
 */
export default Grid;

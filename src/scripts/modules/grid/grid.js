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

  /**
   * Based on the result of the attack, update the state of all the adjacent coordinates that are
   *  currently 'UNKNOWN' to 'DERIVED_EMPTY'.
   * @param {*} row
   * @param {*} column
   * @param {*} shipSunk
   */
  #markDerivedEmpty(row, column, shipSunk) {
    // init the adjacent list of coordinates
    let adjacentCoordinates;

    // retrieve the tiles that will be marked as 'DERIVED_EMPTY' based on the result of the attack
    if (shipSunk) {
      // extract the list of coordinates the ship is occupying
      const shipCoordinates = this.#getShipCoordinates(this.#state[row][column].ship.id);

      // extract all the adjacent coordinates for all parts and flatten the list
      adjacentCoordinates = shipCoordinates.map(
        (coord) => GridUtilities.getAdjacentCoordinates(coord.row, coord.column, this.#state),
      ).flat();
    } else {
      adjacentCoordinates = GridUtilities.getCrossAdjacentCoordinates(row, column, this.#state);
    }

    // iterate over each coordinate and set the new state
    adjacentCoordinates.forEach((coord) => {
      if (this.#state[coord.row][coord.column].state === 'UNKNOWN') {
        this.#state[coord.row][coord.column].state = 'DERIVED_EMPTY';
      }
    });
  }

  /**
   * Traverses the grid and finds all the coordinates occupied a given ship.
   * @param {*} id
   * @returns object -> Array<{ row: number, column: number }>
   */
  #getShipCoordinates(id) {
    const coordinates = [];
    this.#state.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (
          this.#state[rowIndex][columnIndex].ship
          && this.#state[rowIndex][columnIndex].ship.id === id
        ) {
          coordinates.push({ row: rowIndex, column: columnIndex });
        }
      });
    });
    return coordinates;
  }
}




/**
 * Module Exports
 */
export default Grid;

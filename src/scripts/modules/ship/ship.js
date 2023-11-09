/**
 * Ship Class
 * This class implements the core ship functionality that handles the state of a ship.
 */
class Ship {
  // the length of the ship (horizontally or vertically)
  #length;

  // the number of times the ship has been hit
  #hitCount;

  constructor(length) {
    this.#length = length;
    this.#hitCount = 0;
  }

  /**
   * Hits a ship as long as it hasn't sunk. Note that if the ship has already been sunk, it throws
   * an error.
   */
  hit() {
    if (this.isSunk()) {
      throw new Error('The ship cannot be hit again as it has already sunk.');
    }
    this.#hitCount += 1;
  }

  /**
   * Verifies if a ship has been sunk based.
   * @returns boolean
   */
  isSunk() {
    return this.#hitCount === this.#length;
  }
}

/**
 * Module Exports
 */
export default Ship;

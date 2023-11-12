import Utilities from '../utilities';
import Gameboard from '../gameboard';

/**
 * Player Class
 * Handles the player's gameboard as well as the issuing of attacks.
 */
class Player {
  // the attribute name holding the encoded coordinates
  #attributeName = 'data-coordinates';

  // the gameboard instance
  gameboard;

  constructor() {
    // init the instance of the gameboard
    this.gameboard = new Gameboard(true);
  }

  /**
   * Triggers whenever the player clicks on the machine's grid and it is their turn. Decodes the
   * attack coordinates and if it is valid, it returns it. Otherwise, it returns undefined.
   * @param {*} event
   * @param {*} machineGameboard
   * @returns undefined|object -> { row: number, column: number }
   */
  decodeAttack(event, machineGameboard) {
    const attack = this.#decodeCoordinate(event);
    return attack && machineGameboard.canReceiveAttack(attack.row, attack.column)
      ? attack
      : undefined;
  }

  /**
   * Given an event, it extracts the encoded coordinates and verifies their validity. If valid, it
   * returns the coordinate object. Otherwise, it returns undefined.
   * @param {*} event
   * @returns undefined|object -> { row: number, column: number }
   */
  #decodeCoordinate(event) {
    const encodedCoordinate = event.target.getAttribute(this.#attributeName);
    if (Utilities.isCoordinate(encodedCoordinate)) {
      return Utilities.decodeCoordinate(encodedCoordinate);
    }
    return undefined;
  }
}




/**
 * Module Exports
 */
export default Player;

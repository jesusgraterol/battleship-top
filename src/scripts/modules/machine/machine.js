import Utilities from '../utilities';
import Gameboard from '../gameboard';


/**
 * Machine Class
 * Handles the machine's gameboard as well as the issuing of attacks.
 */
class Machine {
  // the gameboard instance
  gameboard;

  constructor() {
    // init the instance of the gameboard
    this.gameboard = new Gameboard(false);
  }

  /**
   * Generates an attack based on the current state. If a ship has been locked in, it will attack
   * the adjacent coordinates. Otherwise, it generates a random attack.
   * @param {*} playerGameboard
   * @returns object -> { row: number, column: number }
   */
  generateAttack(playerGameboard) {
    // @TODO: Implement intelligence when a ship part is hit
    return Machine.#generateRandomAttack(playerGameboard);
  }

  /**
   * Iterates until a valid attack is found and then it returns it.
   * @param {*} playerGameboard
   * @returns object -> { row: number, column: number }
   */
  static #generateRandomAttack(playerGameboard) {
    let attack;
    while (attack === undefined) {
      const row = Utilities.generateRandomInt(0, 9);
      const column = Utilities.generateRandomInt(0, 9);
      attack = playerGameboard.canReceiveAttack(row, column) ? { row, column } : undefined;
    }
    return attack;
  }
}




/**
 * Module Exports
 */
export default Machine;

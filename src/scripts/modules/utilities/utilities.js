import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

/**
 * Utilities Class
 * This class provides a toolkit that aims to bring consistency throughout modules when performing
 * common tasks.
 */
class Utilities {
  /* *************************
   * Coordinates Management  *
   ************************* */

  /**
   * Encodes a given coordinate into a string.
   * @param {*} row
   * @param {*} column
   * @returns string
   */
  static encodeCoordinate(row, column) {
    return `r${row}_c${column}`;
  }

  /**
   * Decodes a given string coordinate and returns an object containing both, row and column.
   * @param {*} coordinateString
   * @returns object { row: number, column: number }
   */
  static decodeCoordinate(coordinateString) {
    if (!Utilities.isCoordinate(coordinateString)) {
      throw new Error('The provided coordinate string is invalid and therefore it cannot be decoded.');
    }
    const split = coordinateString.split('_');
    return {
      row: Number(split[0].slice(1)),
      column: Number(split[1].slice(1)),
    };
  }

  /**
   * Ensures that a given coordinate string is valid.
   * @param {*} coordinateString
   * @returns boolean
   */
  static isCoordinate(coordinateString) {
    return /^r\d_c\d$/.test(coordinateString);
  }




  /* ******************************************
   * Universally Unique Identifier Management *
   ****************************************** */

  /**
   * Generates a Universally Unique Identifier and returns it.
   * @returns string
   */
  static generateID() {
    return uuidv4();
  }

  /**
   * Validates a given uuid.
   * @param {*} uuid
   * @returns boolean
   */
  static validateID(uuid) {
    return uuidValidate(uuid);
  }





  /* *************************
   * Random Value Generators *
   ************************* */

  /**
   * Generates a random integer within a given range. Both, min and max are inclusive.
   * @param {*} min
   * @param {*} max
   * @returns number
   */
  static generateRandomInt(min, max) {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
  }

  /**
   * Generates a random boolean value. Sort of like flipping a coin.
   * @returns boolean
   */
  static generateRandomBoolean() {
    return Math.random() > 0.5;
  }
}





/**
 * Module Exports
 */
export default Utilities;

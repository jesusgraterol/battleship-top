/**
 * Utilities Singleton
 * This class provides a toolkit that aims to bring consistency throughout modules when performing
 * common tasks.
 */
class Utilities {
  /* *************************
   * Coordinates Management  *
   ************************* */

  /**
   * Encodes a given coordinate into a string.
   * @param {*} x
   * @param {*} y
   * @returns string
   */
  static encodeCoordinate(x, y) {
    return `x${x}_y${y}`;
  }

  /**
   * Decodes a given string coordinate and returns an object containing both, x and y.
   * @param {*} coordinateString
   * @returns object { x: number, y: number }
   */
  static decodeCoordinate(coordinateString) {
    if (!Utilities.isCoordinate(coordinateString)) {
      throw new Error('The provided coordinate string is invalid and therefore it cannot be decoded.');
    }
    const split = coordinateString.split('_');
    return {
      x: Number(split[0].slice(1)),
      y: Number(split[1].slice(1)),
    };
  }

  /**
   * Ensures that a given coordinate string is valid.
   * @param {*} coordinateString
   * @returns boolean
   */
  static isCoordinate(coordinateString) {
    return /^x\d_y\d$/.test(coordinateString);
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

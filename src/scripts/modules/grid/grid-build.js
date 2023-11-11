import Utilities from '../utilities';
import GridUtilities from './grid-utilities';

/**
 * Grid Build Class
 * Handles the creation of a grid with randomly positioned ships.
 */
class GridBuild {
  /**
   * Builds a grid and places the participant's ships randomly.
   * @param {*} ships
   * @returns object -> Array<Array<object>>
   */
  static buildRandomGrid(ships) {
    // initialize a blank grid
    const grid = GridUtilities.buildBlankGrid();

    // iterate over each ship and insert them into the grid following all rules
    ships.flat().forEach((ship) => {
      GridBuild.#generateRandomCoordinatesForShip(ship.length, grid).forEach((coordinate) => {
        grid[coordinate.row][coordinate.column].ship = ship;
      });
    });

    // finally, return the dealt grid
    return grid;
  }



  /**
   * Calculates a random area for a ship to be positioned based on its length and returns it.
   * @param {*} shipLength
   * @param {*} grid
   * @returns object -> Array<{ row: number, column: number }>
   */
  static #generateRandomCoordinatesForShip(shipLength, grid) {
    // initialize the coordinates array
    let coordinates;

    // iterate until a valid coordinates area is put together
    while (coordinates === undefined) {
      // init the temp coordinates
      const tempCoordinates = [];

      // calculate the orientation
      const isVertical = Utilities.generateRandomBoolean();

      // Calculate the base coordinates
      const baseRow = Utilities.generateRandomInt(0, 9);
      const baseColumn = Utilities.generateRandomInt(0, 9);

      // identify the coordinate that will increment based on the orientation|axis
      const baseDynamicValue = isVertical ? baseRow : baseColumn;

      // Only proceed if the ship fits in the area
      if (baseDynamicValue + shipLength <= 9) {
        // put together the list of random coordinates that will comprise the area
        for (let i = baseDynamicValue; i < baseDynamicValue + shipLength; i += 1) {
          tempCoordinates.push({
            row: isVertical ? i : baseRow,
            column: isVertical ? baseColumn : i,
          });
        }

        // if all the random coordinates within the area are valid, stop the interation
        coordinates = tempCoordinates.every((c) => GridBuild.#isShipCoordinateValid(c, grid))
          ? tempCoordinates
          : undefined;
      }
    }

    // finally, return the coordinates
    return coordinates;
  }

  /**
   * Verifies if a given ship coordinate is valid as they cannot:
   * - Overflow the grid
   * - Overlap another ship part
   * - Does not have adjacent ships
   * @param {*} coordinates
   * @param {*} grid
   * @returns boolean
   */
  static #isShipCoordinateValid(coordinates, grid) {
    return (coordinates.row >= 0 && coordinates.row <= 9)
            && (coordinates.column >= 0 && coordinates.column <= 9)
            && grid[coordinates.row][coordinates.column].ship === undefined
            && !GridBuild.#hasAdjacentShip(coordinates, grid);
  }

  /**
   * Verifies if there is a ship right next to the given coordinate. The purpose of this
   * functionality is to recreate the following implementation of the game:
   * http://en.battleship-game.org/
   * @param {*} coordinates
   * @param {*} grid
   * @returns booolean
   */
  static #hasAdjacentShip(coordinates, grid) {
    return GridUtilities.getAdjacentCoordinates(coordinates.row, coordinates.column, grid).some(
      (coordinate) => grid[coordinate.row][coordinate.column].ship !== undefined,
    );
  }
}




/**
 * Module Exports
 */
export default GridBuild;

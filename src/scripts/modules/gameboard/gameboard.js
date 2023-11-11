import Utilities from '../utilities';
import GameboardRenderer from './gameboard-renderer';
import Ship from '../ship';

/**
 * Gameboard Class
 * Handles the grid functionalities for a participant.
 */
class Gameboard {
  // the instance of renderer
  #renderer;

  // the ship instances by kind
  #ships;

  // the grid array
  #grid;

  constructor(isPlayer) {
    // init the renderer
    this.#renderer = new GameboardRenderer(isPlayer);

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





  /* ***************
   * Ships Builder *
   *************** */

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
   * Grid Builder *
   ************** */

  /**
   * Builds a grid and places the participant's ships randomly.
   * @param {*} ships
   * @returns object -> Array<Array<object>>
   */
  static #buildGrid(ships) {
    // initialize a blank grid
    const grid = Gameboard.#buildBlankGrid();

    // iterate over each ship and insert them into the grid following all rules
    ships.flat().forEach((ship) => {
      Gameboard.#generateRandomShipCoordinates(ship.length, grid).forEach((coordinate) => {
        grid[coordinate.row][coordinate.column].ship = ship;
      });
    });

    // finally, return the dealt grid
    return grid;
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
        grid[row][column] = { state: 'UNKNOWN', ship: undefined };
      }
    }
    return grid;
  }

  /**
   * Calculates a random area for a ship to be positioned based on its length and returns it.
   * @param {*} shipLength
   * @param {*} grid
   * @returns object -> Array<{ row: number, column: number }>
   */
  static #generateRandomShipCoordinates(shipLength, grid) {
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
        coordinates = tempCoordinates.every((c) => Gameboard.#isShipCoordinateValid(c, grid))
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
            && !Gameboard.#hasAdjacentShip(coordinates, grid);
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
/*     return (grid[r - 1] && grid[r - 1][c].ship) // ^
          || (grid[r - 1] && grid[r - 1][c + 1] && grid[r - 1][c + 1].ship) // >^
          || (grid[r][c + 1] && grid[r][c + 1].ship) // >
          || (grid[r + 1] && grid[r + 1][c + 1] && grid[r + 1][c + 1].ship) // >v
          || (grid[r + 1] && grid[r + 1][c].ship) // v
          || (grid[r + 1] && grid[r + 1][c - 1] && grid[r + 1][c - 1].ship) // <v
          || (grid[r][c - 1] && grid[r][c - 1].ship) // <
          || (grid[r - 1] && grid[r - 1][c - 1] && grid[r - 1][c - 1].ship); // <^ */
    return Gameboard.#getAdjacentCoordinates(coordinates.row, coordinates.column, grid).some(
      (coordinate) => grid[coordinate.row][coordinate.column].ship !== undefined,
    );
  }




  /* *******************
   * Grid Misc Helpers *
   ******************* */


  /**
   * Given a coordinate and a grid (any state), it returns the list of valid adjacent coordinates.
   * @param {*} r
   * @param {*} c
   * @param {*} g
   * @returns object -> Array<{ row: number, column: number }>
   */
  static #getAdjacentCoordinates(r, c, g) {
    // init the list coordinates
    const adjacent = [];

    // build the list of valid adjacent coordinates
    if (g[r - 1]) adjacent.push({ row: r - 1, column: c }); // ^
    if (g[r - 1] && g[r - 1][c + 1]) adjacent.push({ row: r - 1, column: c + 1 }); // >^
    if (g[r][c + 1]) adjacent.push({ row: r, column: c + 1 }); // >
    if (g[r + 1] && g[r + 1][c + 1]) adjacent.push({ row: r + 1, column: c + 1 }); // >v
    if (g[r + 1]) adjacent.push({ row: r + 1, column: c }); // v
    if (g[r + 1] && g[r + 1][c - 1]) adjacent.push({ row: r + 1, column: c - 1 }); // <v
    if (g[r][c - 1]) adjacent.push({ row: r, column: c - 1 }); // <
    if (g[r - 1] && g[r - 1][c - 1]) adjacent.push({ row: r - 1, column: c - 1 }); // <^

    // finally, return them
    return adjacent;
  }
}





/**
 * Module Exports
 */
export default Gameboard;

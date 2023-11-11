/**
 * Grid Utilities Class
 * Exposes several helper functions that simplify the interactions between the gameboard and
 * the grid as well as internal calculations.
 */
class GridUtilities {
  /* ***********************
   * Grid Scanning Helpers *
   *********************** */

  /**
   * Given a coordinate and a grid (any state), it returns the list of valid adjacent coordinates.
   * @param {*} r
   * @param {*} c
   * @param {*} g
   * @returns object -> Array<{ row: number, column: number }>
   */
  static getAdjacentCoordinates(r, c, g) {
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





  /* ********************
   * Grid Build Helpers *
   ******************** */

  /**
   * Builds a grid in blank|pristine state ready for ships to be positioned.
   * @returns object -> Array<Array<object>>
   */
  static buildBlankGrid() {
    const grid = [];
    for (let row = 0; row < 10; row += 1) {
      grid[row] = [];
      for (let column = 0; column < 10; column += 1) {
        grid[row][column] = { state: 'UNKNOWN', ship: undefined };
      }
    }
    return grid;
  }
}




/**
 * Module Exports
 */
export default GridUtilities;

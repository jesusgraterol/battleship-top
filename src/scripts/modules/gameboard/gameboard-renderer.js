import Utilities from '../utilities';

/**
 * Gameboard Renderer Class
 * Handles the rendering of all the elements that belong to the Gameboard.
 */
class GameboardRenderer {
  // the owner of the board
  #isPlayer;

  // the instance of the ships' states element
  #shipsStatesEl;

  // the instance of the grid element
  #gridEl;

  constructor(isPlayer) {
    // initialize the owner of the board
    this.#isPlayer = isPlayer;

    // initialize the instance of the ships' states element based on the owner
    this.#shipsStatesEl = this.#isPlayer
      ? document.getElementById('player_ships_states')
      : document.getElementById('machine_ships_states');

    // initialize the instance of the grid element based on the owner
    this.#gridEl = this.#isPlayer
      ? document.getElementById('player_grid')
      : document.getElementById('machine_grid');
  }

  /**
   * Renders all the gameboard elements based on the latest state.
   * @param {*} ships
   * @param {*} grid
   */
  render(ships, grid) {
    // Render the ships' states
    this.#renderShipsStates(ships);

    // Render the grid
    this.#renderGrid(grid);
  }




  /* ************************
   * Ships' States Renderer *
   ************************ */

  /**
   * Renders the ships based on their current states.
   * @param {*} ships
   */
  #renderShipsStates(ships) {
    this.#shipsStatesEl.innerHTML = ships.map(GameboardRenderer.#buildShipRow).join('');
  }

  /**
   * Builds the HTML content for a full row of ships based on their sizes and states.
   * @param {*} shipRow
   * @returns string
   */
  static #buildShipRow(shipRow) {
    return `
      <div class="ships-row">
        ${shipRow.map(GameboardRenderer.#buildShip).join('')}
      </div>
    `;
  }

  /**
   * Builds a given ship's HTML content based on its length & state.
   * @param {*} ship
   * @returns string
   */
  static #buildShip(ship) {
    return `
      <div class="ship${ship.isSunk() ? ' sunk' : ''}">
        ${GameboardRenderer.#buildShipParts(ship.length)}
      </div>
    `;
  }

  /**
   * Returns the HTML content that comprises all the parts based on the ship's length
   * @param {*} shipLength
   * @returns string
   */
  static #buildShipParts(shipLength) {
    return Array(shipLength).fill('<div class="part"></div>').join('');
  }





  /* ***************
   * Grid Renderer *
   *************** */

  /**
   * Renders the grid based on the current state.
   * @param {*} grid
   */
  #renderGrid(grid) {
    let content = '';
    for (let row = 0; row < grid.length; row += 1) {
      for (let column = 0; column < grid[row].length; column += 1) {
        content += `
          <div class="tile unknown" data-coordinate="${Utilities.encodeCoordinate(row, column)}"></div>
        `;
      }
    }
    this.#gridEl.innerHTML = content;
  }
}





/**
 * Module Exports
 */
export default GameboardRenderer;

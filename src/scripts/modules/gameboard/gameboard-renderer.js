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
   * @param {*} gridState
   */
  render(ships, gridState) {
    // Render the ships' states
    this.#renderShipsStates(ships);

    // Render the grid
    this.#renderGrid(gridState);
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
   * @param {*} gridState
   */
  #renderGrid(gridState) {
    this.#gridEl.innerHTML = gridState.map(
      (column, rowIndex) => this.#buildGridRow(rowIndex, column),
    ).join('');
  }

  /**
   * Builds the HTML content for a grid row.
   * @param {*} row
   * @param {*} columns
   * @returns string
   */
  #buildGridRow(rowIndex, columns) {
    return columns.reduce(
      (accum, currentValue, columnIndex) => accum + this.#buildGridTile(
        rowIndex,
        columnIndex,
        currentValue,
      ),
      '',
    );
  }

  /**
   * Builds the HTML content for a grid tile based on the current coordinates and state.
   * @param {*} rowIndex
   * @param {*} columnIndex
   * @param {*} tileObj
   * @returns string
   */
  #buildGridTile(rowIndex, columnIndex, tileObj) {
    const md = this.#buildGridTileMetadata(rowIndex, columnIndex, tileObj);
    return `
      <div class="${md.classList}" data-coordinates="${md.coordinates}">
        ${md.innerContent}
      </div>
    `;
  }

  /**
   * Grid Tile Metadata
   */

  /**
   * Builds the metadata object for a given tile based on its state and coordinates.
   * @param {*} rowIndex
   * @param {*} columnIndex
   * @param {*} tileObj
   * @returns object -> { classList: string, coordinates: string, innerContent: string }
   */
  #buildGridTileMetadata(rowIndex, columnIndex, tileObj) {
    return {
      classList: this.#buildTileClassList(tileObj),
      coordinates: Utilities.encodeCoordinate(rowIndex, columnIndex),
      innerContent: GameboardRenderer.#buildTileInnerContent(tileObj),
    };
  }

  /**
   * Builds the list of CSS Classes that will be applied to the tile element.
   * @param {*} tileObj
   * @returns string
   */
  #buildTileClassList(tileObj) {
    let classList = 'tile';
    if (tileObj.state === 'UNKNOWN') classList += ' unknown';
    if (tileObj.state === 'EMPTY') classList += ' empty';
    if (tileObj.state === 'DERIVED_EMPTY') classList += ' empty derived';
    if (tileObj.ship) {
      const isSunk = tileObj.ship.isSunk();
      if (tileObj.state === 'HIT' && !isSunk) classList += ' hit';
      if (tileObj.state === 'HIT' && isSunk) classList += ' sunk';
      if (this.#isPlayer && tileObj.state === 'UNKNOWN') classList += ' part';
    }
    return classList;
  }

  /**
   * Builds the content that will be inserted into the tile. Keep in mind it can be an empty string.
   * @param {*} tileObj
   * @returns string
   */
  static #buildTileInnerContent(tileObj) {
    switch (tileObj.state) {
      case 'HIT':
        return '<span class="md-icon">destruction</span>';
      default:
        return '';
    }
  }
}





/**
 * Module Exports
 */
export default GameboardRenderer;

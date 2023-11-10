import Utilities from '../utilities';

/**
 * Gameboard Renderer Class
 * ...
 */
class GameboardRenderer {
  // the owner of the board
  #isPlayer;

  // the instance of the grid element
  #gridEl;

  constructor(isPlayer) {
    // initialize the owner of the board
    this.#isPlayer = isPlayer;

    // initialize the instance of the grid based on the owner
    this.#gridEl = this.#isPlayer
      ? document.getElementById('player_grid')
      : document.getElementById('machine_grid');
  }

  renderGrid() {
    let content = '';
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        // Mixed Stuff
/*         if (column % 2 === 0 && row % 2 === 0) {
          content += `<div class='tile'><span class="md-icon">destruction</span></div>`;
        } else {
          if (column % 3 === 0) {
            content += `<div class='tile'><span class="md-icon">blur_on</span></div>`;
          } else {
            content += `<div class='tile'></div>`;
          }
        } */
        if (this.#isPlayer) {
          if (row === 5 && (column >= 2 && column <= 6)) {
            if (column === 6 || column === 5) {
              content += `<div class="tile hit" data-coordinate="${Utilities.encodeCoordinate(row, column)}"><span class="md-icon">destruction</span></div>`;
            } else {
              content += `<div class="tile part" data-coordinate="${Utilities.encodeCoordinate(row, column)}"></div>`;
            }
          } else {
            content += `<div class="tile unknown" data-coordinate="${Utilities.encodeCoordinate(row, column)}"></div>`;
          }
        } else {
          if (row === 1 && column === 1) {
            content += `<div class="tile empty" data-coordinate="${Utilities.encodeCoordinate(row, column)}"></div>`;
          } else if (row === 2 && column === 3) {
            content += `<div class="tile empty derived" data-coordinate="${Utilities.encodeCoordinate(row, column)}"></div>`;
          } else if (row === 5 && (column >= 2 && column <= 6)) {
            content += `<div class="tile hit" data-coordinate="${Utilities.encodeCoordinate(row, column)}"><span class="md-icon">destruction</span></div>`;
          }  else {
            content += `<div class="tile unknown" data-coordinate="${Utilities.encodeCoordinate(row, column)}"></div>`;
          }
        }
      }
    }
    this.#gridEl.innerHTML = content;
  }
}





/**
 * Module Exports
 */
export default GameboardRenderer;

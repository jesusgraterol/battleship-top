import Utilities from '../utilities';

/**
 * Gameboard Renderer Class
 * ...
 */
class GameboardRenderer {
  // the instance of the grid element
  #gridEl;

  constructor(isPlayer) {
    // initialize the instance of the grid based on the owner
    this.#gridEl = isPlayer
      ? document.getElementById('player_grid')
      : document.getElementById('machine_grid');
  }

  renderGrid() {
    let content = '';
    for (let row = 0; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        /* content += `<div class='tile'><p>${Utilities.encodeCoordinate(row, column)}</p></div>`; */
        if (column % 2 === 0 && row % 2 === 0) {
          content += `<div class='tile'><span class="md-icon">destruction</span></div>`;
        } else {
          if (column % 3 === 0) {
            content += `<div class='tile'><span class="md-icon">blur_on</span></div>`;
          } else {
            content += `<div class='tile'></div>`;
          }
        }
        /* content += `<div class='tile'><span class="md-icon">destruction</span></div>`; */
      }
    }
    this.#gridEl.innerHTML = content;
  }
}

/**
 * Module Exports
 */
export default GameboardRenderer;

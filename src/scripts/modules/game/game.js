import Machine from '../machine';
import Player from '../player';

/**
 * Game Class
 * ...
 */
class Game {
  // the participant instances
  #machine;

  #player;

  // the game result elements
  #gameResultContainerEl;

  #gameResultTitleEl;

  #playAgainButtonEl;

  constructor() {
    // initialize the game result elements and subscribe to the play again button
    this.#gameResultContainerEl = document.getElementById('game_result_container');
    this.#gameResultTitleEl = document.getElementById('game_result_title');
    this.#playAgainButtonEl = document.getElementById('play_again_button');
    this.#playAgainButtonEl.addEventListener('click', () => this.start());
  }


  /**
   * Initializes a fresh instance of the gameboards and starts the game.
   */
  start() {
    // before proceeding, hide the game result
    this.#hideGameResult();

    // initialize the machine and the player
    this.#machine = new Machine();
    this.#player = new Player();
  }





  /* *********************
   * Game Result Overlay *
   ********************* */

  /**
   * Shows the game results as well as the "Play again" button.
   * @param {*} playerWon
   */
  #showGameResult(playerWon) {
    this.#gameResultTitleEl.innerText = playerWon ? 'YOU WIN!' : 'YOU LOSE!';
    this.#gameResultContainerEl.style.display = 'flex';
  }

  /**
   * Hides the game result overlay.
   */
  #hideGameResult() {
    this.#gameResultContainerEl.style.display = 'none';
  }
}




/**
 * Module Exports
 */
export default Game;

import Machine from '../machine';
import Player from '../player';

/**
 * Game Class
 * ...
 */
class Game {
  // the element of the machine's grid container
  #machineGridContainerEl;

  // the participant instances
  #machine;

  #player;

  // the game result elements
  #gameResultContainerEl;

  #gameResultTitleEl;

  #playAgainButtonEl;

  constructor() {
    // initiailize and subscribe to the machine's click events
    this.#machineGridContainerEl = document.getElementById('machine_grid_container');
    this.#machineGridContainerEl.addEventListener('click', (evt) => this.#onMachineGridClick(evt));

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




  /* *************************
   * Player Input Management *
   ************************* */

  /**
   * Triggers whenever the player clicks on the machine's grid container. It ensures it is the
   * player's turn and also validates the input before proceeding.
   * @param {*} evt
   */
  #onMachineGridClick(evt) {
    console.log(evt.target.getAttribute('data-coordinates'));
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

/* eslint-disable no-await-in-loop */
import Utilities from '../utilities';
import Machine from '../machine';
import Player from '../player';

/**
 * Game Class
 * Handles the game life cycle as well as the participants' input.
 */
class Game {
  // the grid container elements of the participants
  #playerGridContainerEl;

  #machineGridContainerEl;

  // the participant instances
  #machine;

  #player;

  // the game's turn state
  #playerTurn;

  // the game result elements
  #gameResultContainerEl;

  #gameResultTitleEl;

  #playAgainButtonEl;

  constructor() {
    // initiailize and subscribe to the machine's click events
    this.#playerGridContainerEl = document.getElementById('player_grid_container');
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

    // set the current turn state
    this.#setTurnState(true);
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
    if (this.#playerTurn) {
      const attack = this.#player.decodeAttack(evt, this.#machine.gameboard);
      if (attack) this.#onPlayerAttack(attack);
    }
  }





  /* *****************
   * Game Life Cycle *
   ***************** */

  /**
   * Handles a player's attack as well as the impact it has on the overall gameflow.
   * @param {*} attack
   */
  async #onPlayerAttack(attack) {
    // process the attack on the machine's gameboard
    const playerAtkResult = this.#machine.gameboard.receiveAttack(attack.row, attack.column);

    // if a ship was not hit, it is the machine's turn. Otherwise, check if the game is over
    if (!playerAtkResult.shipHit) {
      // set the turn state
      this.#setTurnState(false);

      // iterate until it is not the machine's turn anymore or the game ends
      let machineTurn = true;
      while (machineTurn) {
        // generate the attack
        const machineAtk = this.#machine.generateAttack(this.#player.gameboard);

        // process the attack on player's gameboard
        await Utilities.asyncDelay(500);
        const machineAtkResult = this.#player.gameboard.receiveAttack(
          machineAtk.row,
          machineAtk.column,
        );
        await Utilities.asyncDelay(500);

        /**
         * end the game if the gameboard was destroyed. Otherwise, check if it is still the
         * machine's turn
         */
        if (machineAtkResult.gameboardDestroyed) {
          machineTurn = false;
          this.#showGameResult(false);
        } else {
          machineTurn = machineAtkResult.shipHit;
        }
      }

      // Set the turn state back
      this.#setTurnState(true);
    } else if (playerAtkResult.gameboardDestroyed) {
      this.#showGameResult(true);
    }
  }





  /* ***********************
   * Turn State Management *
   *********************** */

  /**
   * Handles the state of the game's turn system as well as the DOM elements that need to change
   * accordingly.
   * @param {*} isPlayerTurn
   */
  #setTurnState(isPlayerTurn) {
    // disable the grid container accordingly
    if (isPlayerTurn) {
      this.#playerGridContainerEl.classList.add('disabled');
      this.#machineGridContainerEl.classList.remove('disabled');
    } else {
      this.#playerGridContainerEl.classList.remove('disabled');
      this.#machineGridContainerEl.classList.add('disabled');
    }

    // set the turn property
    this.#playerTurn = isPlayerTurn;
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

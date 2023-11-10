/* eslint-disable no-unused-vars */

/**
 * App Imports
 * Stylesheets, assets and scripts should be imported in the following section so they are included
 * in the build.
 */





// Stylesheets
import '../stylesheets/app.css';





// Scripts
import Utilities from './modules/utilities';
import Ship from './modules/ship';
import Gameboard from './modules/gameboard';
import Machine from './modules/machine';
import Player from './modules/player';
import Game from './modules/game';





// App Initializer
const game = new Game();
game.start();

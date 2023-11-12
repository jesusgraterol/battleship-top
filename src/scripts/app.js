/* eslint-disable no-unused-vars */

/**
 * App Imports
 * Stylesheets, assets and scripts should be imported in the following section so they are included
 * in the build.
 */

// Stylesheets
import '../stylesheets/app.css';

// Scripts
import Game from './modules/game';





// App Initializer
const game = new Game();
game.start();

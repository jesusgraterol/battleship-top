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
import Gameboard, { GameboardRenderer } from './modules/gameboard';

// App Initializer
// @TODO
const renderer = new GameboardRenderer(true);
renderer.renderGrid();

const machineRenderer = new GameboardRenderer(false);
machineRenderer.renderGrid();

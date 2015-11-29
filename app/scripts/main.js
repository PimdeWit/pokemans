/**
 *  Start off the app.
 * @constructor
 */
Pokemon = function() {
  Pokemon.logger('Starting Application');
  this.init();
};

/**
 *  Show dev logs?
 */
Pokemon.DEBUG = true;


/**
 * Initialise the application.
 */
Pokemon.prototype.init = function() {
  Pokemon.logger('Pokemon initialised');

  this.setup();
  this.generateWorld();
  this.createCharacter();
};


/**
 * Setup the PIXI renderer and canvas.
 */
Pokemon.prototype.setup = function() {
  new Pokemon.Setup;
};


/**
 * Generate a map with the help of tiles.
 */
Pokemon.prototype.generateWorld = function() {
  new Pokemon.World;
};


/**
 * Generate a map with the help of tiles.
 */
Pokemon.prototype.createCharacter = function() {
  new Pokemon.Character;
};

/**
 * Initialise Pokemon once everything is loaded.
 */
 window.onload = function() {
   new Pokemon;
 };


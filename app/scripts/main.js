

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

  new Pokemon.Setup;
  new Pokemon.World;
};


/**
 *  Render out the app.
 */
Pokemon.prototype.createRenderer = function() {
  Pokemon.logger('Setting up PIXI renderer');

  this.renderer = new PIXI.WebGLRenderer(Pokemon.cfgCore.WIDTH,
      Pokemon.cfgCore.HEIGHT, {
    backgroundColor: Pokemon.cfgRenderer.BACKGROUND,
    autoResize: Pokemon.cfgRenderer.AUTORESIZE,
    antialias: Pokemon.cfgRenderer.ANTIALIAS
  });

  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

  /* Pass this.stage to global scope */
  Pokemon.cfgCore.RENDERER = this.renderer;
};


/**
 *  Create a stage.
 */
Pokemon.prototype.createStage = function() {
  Pokemon.logger('Setting up PIXI stage');

  this.stage = new PIXI.Container();

  /* Pass this.stage to global scope */
  Pokemon.cfgCore.STAGE = this.stage;
};


/**
 *  Append the canvas to the DOM.
 */
Pokemon.prototype.appendViewport = function() {
  Pokemon.logger('Appending stage to DOM');

  document.body.appendChild(this.renderer.view);
};


/**
 * Initialise the app.
 *
 * window.onload gets triggered as soon as ALL content is loaded
 * this includes images, HTML, CSS, and other scripts based on your ordering
 * in your HTML file. That's the reason why this file (app.js) gets called last.
 */
 window.onload = function() {
   new Pokemon;
 };


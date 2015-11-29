/**
 *  Create a viewport, a renderer and a stage to append graphics to.
 *  @constructor
 */
Pokemon.Setup = function() {
  Pokemon.logger('');
  Pokemon.logger('Pokemon.Setup');
  /* Object */
  this.renderer = null;

  /* Object */
  this.stage = null;

  /* Initialise Setup */
  this.init();
};


/**
 *  Set up the main components to render the app.
 */
Pokemon.Setup.prototype.init = function() {
  Pokemon.logger('Setup initialised');

  this.createRenderer();
  this.createStage();
  this.appendViewport();
};


/**
 *  Render out the app.
 */
Pokemon.Setup.prototype.createRenderer = function() {
  Pokemon.logger('Setting up PIXI renderer');

  /* WebGLRenderer for fast rendering. */
  this.renderer = new PIXI.WebGLRenderer(Pokemon.configCore.WIDTH,
      Pokemon.configCore.HEIGHT, {
    backgroundColor: Pokemon.configRenderer.BACKGROUND,
    autoResize: Pokemon.configRenderer.AUTORESIZE,
    antialias: Pokemon.configRenderer.ANTIALIAS
  });

  /* Scale mode to "Nearest" for pixelated (non-aliased) scaling. */
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

  /* Pass this.stage to global scope */
  Pokemon.configCore.RENDERER = this.renderer;
};


/**
 *  Create a stage.
 */
Pokemon.Setup.prototype.createStage = function() {
  Pokemon.logger('Setting up PIXI stage');

  /* New PIXI stage */
  this.stage = new PIXI.Container();

  /* Pass this.stage to global scope */
  Pokemon.configCore.STAGE = this.stage;
};


/**
 *  Append the canvas to the DOM.
 */
Pokemon.Setup.prototype.appendViewport = function() {
  Pokemon.logger('Appending stage to DOM');

  // Append our viewport to the DOM.
  document.body.appendChild(Pokemon.configCore.RENDERER.view);
};


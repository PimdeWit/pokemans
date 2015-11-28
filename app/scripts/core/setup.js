/**
 *  Generate the world.
 *  @constructor
 */
Pokemon.Setup = function() {
  /* Object */
  this.renderer = null;

  /* Object */
  this.stage = null;

  this.init();
};


/**
 *  Set up the main components to render the app.
 */
Pokemon.Setup.prototype.init = function() {
  Pokemon.logger('Pokemon initialised');

  this.createRenderer();
  this.createStage();
  this.appendViewport();
};


/**
 *  Render out the app.
 */
Pokemon.Setup.prototype.createRenderer = function() {
  Pokemon.logger('Setting up PIXI renderer');

  this.renderer = new PIXI.WebGLRenderer(Pokemon.configCore.WIDTH,
      Pokemon.configCore.HEIGHT, {
    backgroundColor: Pokemon.configRenderer.BACKGROUND,
    autoResize: Pokemon.configRenderer.AUTORESIZE,
    antialias: Pokemon.configRenderer.ANTIALIAS
  });

  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

  /* Pass this.stage to global scope */
  Pokemon.configCore.RENDERER = this.renderer;
};


/**
 *  Create a stage.
 */
Pokemon.Setup.prototype.createStage = function() {
  Pokemon.logger('Setting up PIXI stage');

  this.stage = new PIXI.Container();

  /* Pass this.stage to global scope */
  Pokemon.configCore.STAGE = this.stage;
};


/**
 *  Append the canvas to the DOM.
 */
Pokemon.Setup.prototype.appendViewport = function() {
  Pokemon.logger('Appending stage to DOM');

  document.body.appendChild(Pokemon.configCore.RENDERER.view);
};


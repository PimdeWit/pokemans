

/**
 *  Start off the app.
 * @constructor
 */
Pokemon = function() {
  Pokemon.logger('Starting Application');

  /* Object */
  this.renderer = null;

  /* Object */
  this.stage = null;




  this.init();
};


/**
 *  Show dev logs?
 */
Pokemon.DEBUG = true;

/**
 *  Core settings.
 */
Pokemon.cfgCore = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
  STAGE: this.stage,
  RENDERER: this.renderer
};

/**
 *  Render settings.
 */
Pokemon.cfgRenderer = {
  BACKGROUND: 0xf3f4f5,
  ANTIALIAS: true,
  AUTORESIZE: true
};

/**
 *  Map settings
 */
Pokemon.cfgBuild = {
  TILESIZE: 64
};

/**
 *  Routing/asset settings.
 */
Pokemon.cfgAssets = {
  WATERTILE: 'images/tiles/water/water_0.png'
};




/**
 * Initialise the application.
 */
Pokemon.prototype.init = function() {
  Pokemon.logger('Pokemon initialised');

  this.createRenderer();
  this.createStage();
  this.appendViewport();
  this.addEventListeners_();

  new Pokemon.Build;
};


/**
 *  Add event listeners.
 *  @private
 */
Pokemon.prototype.addEventListeners_ = function() {
  Pokemon.logger('Adding event listeners');

  var self = this;

  window.addEventListener('resize', function() {}, false);
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


/******************************************************************************/


// /**
//  *  Generate the world.
//  *  @constructor
//  */
// Pokemon.Build = function() {
//   Pokemon.logger('------------------------');
//   Pokemon.logger('Pokemon.Build');


//   this.init();
// };


// /**
//  *  Build init.
//  */
// Pokemon.Build.prototype.init = function() {
//   Pokemon.logger('Build initialised');

//   this.setTile('water', 0, 0);
//   this.setTile('water', 1, 0);
//   this.setTile('water', 0, 1);


//   // kick off the animation loop (defined below)
//   this.animate();
// };


// /**
//  *  @param {String} type Options: 'water', 'road' & 'rock'
//  *  @param {Number} x The X position of the tile.
//  *  @param {Number} y The Y position of the tile.
//  */
// Pokemon.Build.prototype.setTile = function(type, x, y) {
//   switch (type) {
//     case 'water':
//       this.createTile_(this.waterTile(), x, y);
//       break;
//     case 'road':
//       this.createTile_(this.roadTile(), x, y);
//       break;
//     case 'rock':
//       this.createTile_(this.rockTile(), x, y);
//       break;
//   }
// };


// /**
//  *  Create main app background
//  *  @return {Object}
//  */
// Pokemon.Build.prototype.waterTile = function() {
//   var texture = PIXI.Texture.fromImage(Pokemon.cfgAssets.WATERTILE);
//   var sprite = new PIXI.Sprite(texture);
//   return sprite;
// };


// *
//  *  Create main app background
//  *  @param {Object} tile The tile which gets added to the scene.
//  *  @param {Number} x The X position of the tile.
//  *  @param {Number} y The Y position of the tile.
//  *  @private
 
// Pokemon.Build.prototype.createTile_ = function(tile, x, y) {
//   Pokemon.logger('Creating tile on position: x' + x + ' y' + y);

//   // Set tile size.
//   this.setSize_(tile, x, y);

//   // Set tile position.
//   this.setPosition_(tile, x, y);

//   // Add the bunny to the scene we are building.
//   Pokemon.cfgCore.STAGE.addChild(tile);
// };

// /**
//  *  Set the position on the map.
//  *  @param {Object} tile The tile that gets resized/scaled.
//  *  @private
//  */
// Pokemon.Build.prototype.setSize_ = function(tile) {
//   tile.width = Pokemon.cfgBuild.TILESIZE;
//   tile.height = Pokemon.cfgBuild.TILESIZE;
// };


// /**
//  *  Set the position on the map.
//  *  @param {Object} tile The tile that gets positioned.
//  *  @param {Number} x The X position of the tile.
//  *  @param {Number} y The Y position of the tile.
//  *  @private
//  */
// Pokemon.Build.prototype.setPosition_ = function(tile, x, y) {
//   tile.position.x = x * Pokemon.cfgBuild.TILESIZE;
//   tile.position.y = y * Pokemon.cfgBuild.TILESIZE;
// };


// /**
//  *  Background Animation.
//  *
//  */
// Pokemon.Build.prototype.animate = function() {
//   var self = this;

//   requestAnimationFrame(this.animate.bind(this));
//   Pokemon.cfgCore.RENDERER.render(Pokemon.cfgCore.STAGE);
// };


/*----------------------------------------------------------------------------*/

/**
 *  Show or hide comments and console logs.
 *  @param {String} log
 *  @constructor
 */
Pokemon.logger = function(log) {
  if (Pokemon.DEBUG) {
    console.log(log);
  }
};


/*----------------------------------------------------------------------------*/

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


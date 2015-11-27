var Pokemon = Pokemon || {};

/**
 *  Generate the world.
 *  @constructor
 */
Pokemon.Build = function() {
  Pokemon.logger('------------------------');
  Pokemon.logger('Pokemon.Build');


  this.init();
};


/**
 *  Build init.
 */
Pokemon.Build.prototype.init = function() {
  Pokemon.logger('Build initialised');

  this.setTile('water', 0, 0);
  this.setTile('water', 1, 0);
  this.setTile('water', 0, 1);


  // kick off the animation loop (defined below)
  this.animate();
};


/**
 *  @param {String} type Options: 'water', 'road' & 'rock'
 *  @param {Number} x The X position of the tile.
 *  @param {Number} y The Y position of the tile.
 */
Pokemon.Build.prototype.setTile = function(type, x, y) {
  switch (type) {
    case 'water':
      this.createTile_(this.waterTile(), x, y);
      break;
    case 'road':
      this.createTile_(this.roadTile(), x, y);
      break;
    case 'rock':
      this.createTile_(this.rockTile(), x, y);
      break;
  }
};


/**
 *  Create main app background
 *  @return {Object}
 */
Pokemon.Build.prototype.waterTile = function() {
  var texture = PIXI.Texture.fromImage(Pokemon.cfgAssets.WATERTILE);
  var sprite = new PIXI.Sprite(texture);
  return sprite;
};


/**
 *  Create main app background
 *  @param {Object} tile The tile which gets added to the scene.
 *  @param {Number} x The X position of the tile.
 *  @param {Number} y The Y position of the tile.
 *  @private
 */
Pokemon.Build.prototype.createTile_ = function(tile, x, y) {
  Pokemon.logger('Creating tile on position: x' + x + ' y' + y);

  // Set tile size.
  this.setSize_(tile, x, y);

  // Set tile position.
  this.setPosition_(tile, x, y);

  // Add the bunny to the scene we are building.
  Pokemon.cfgCore.STAGE.addChild(tile);
};

/**
 *  Set the position on the map.
 *  @param {Object} tile The tile that gets resized/scaled.
 *  @private
 */
Pokemon.Build.prototype.setSize_ = function(tile) {
  tile.width = Pokemon.cfgBuild.TILESIZE;
  tile.height = Pokemon.cfgBuild.TILESIZE;
};


/**
 *  Set the position on the map.
 *  @param {Object} tile The tile that gets positioned.
 *  @param {Number} x The X position of the tile.
 *  @param {Number} y The Y position of the tile.
 *  @private
 */
Pokemon.Build.prototype.setPosition_ = function(tile, x, y) {
  tile.position.x = x * Pokemon.cfgBuild.TILESIZE;
  tile.position.y = y * Pokemon.cfgBuild.TILESIZE;
};


/**
 *  Background Animation.
 *
 */
Pokemon.Build.prototype.animate = function() {
  var self = this;

  requestAnimationFrame(this.animate.bind(this));
  Pokemon.cfgCore.RENDERER.render(Pokemon.cfgCore.STAGE);
};


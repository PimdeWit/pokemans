/**
 *  Generate the world.
 *  @constructor
 */
Pokemon.World = function() {
  Pokemon.logger('Pokemon.World');


  this.init();
};


/**
 *  World init.
 */
Pokemon.World.prototype.init = function() {
  Pokemon.logger('World initialised');

  this.setTile('water', 0, 0);
  this.setTile('water', 1, 0);
  this.setTile('water', 0, 1);


  // Kick off the animation loop.
  this.animate();
};


/**
 *  @param {String} type Options: 'water', 'road' & 'rock'
 *  @param {Number} x The X position of the tile.
 *  @param {Number} y The Y position of the tile.
 */
Pokemon.World.prototype.setTile = function(type, x, y) {
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
Pokemon.World.prototype.waterTile = function() {
  var texture = PIXI.Texture.fromImage(Pokemon.configAssets.WATERTILE);
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
Pokemon.World.prototype.createTile_ = function(tile, x, y) {
  Pokemon.logger('Preparing tile on position: x' + x + ' y' + y);

  // Set tile size.
  this.setSize_(tile, x, y);

  // Set tile position.
  this.setPosition_(tile, x, y);

  // Add the tile to the scene.
  Pokemon.configCore.STAGE.addChild(tile);
};

/**
 *  Set the position on the map.
 *  @param {Object} tile The tile that gets resized/scaled.
 *  @private
 */
Pokemon.World.prototype.setSize_ = function(tile) {
  tile.width = Pokemon.configTiling.TILESIZE;
  tile.height = Pokemon.configTiling.TILESIZE;
};


/**
 *  Set the position on the map.
 *  @param {Object} tile The tile that gets positioned.
 *  @param {Number} x The X position of the tile.
 *  @param {Number} y The Y position of the tile.
 *  @private
 */
Pokemon.World.prototype.setPosition_ = function(tile, x, y) {
  tile.position.x = x * Pokemon.configTiling.TILESIZE;
  tile.position.y = y * Pokemon.configTiling.TILESIZE;
};


/**
 *  Background Animation.
 *
 */
Pokemon.World.prototype.animate = function() {
  var self = this;

  requestAnimationFrame(this.animate.bind(this));
  Pokemon.configCore.RENDERER.render(Pokemon.configCore.STAGE);
};

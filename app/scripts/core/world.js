/**
 *  Generate the world.
 *  @constructor
 */
Pokemon.World = function() {
  Pokemon.logger('Pokemon.World');

  this.map = null;

  this.init();
};


/**
 *  World init.
 */
Pokemon.World.prototype.init = function() {
  Pokemon.logger('World initialised');

  // this.setTile('water', 0, 0);
  // this.setTile('water', 1, 0);
  // this.setTile('water', 0, 1);

  this.createMap('testlevel');
  // Kick off the animation loop.
  this.animate();
};


/**
 *  Load a JSON file which defines a tileset + attributes for a map.
 * @param {String} callback
 */
Pokemon.World.prototype.getMapData = function(maptitle, callback) {
  // Make a request for a JSON file.
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');

  // GET the JSON file.
  xobj.open('GET',
    Pokemon.configAssets.MAPS + maptitle + '/' + maptitle + '.json',
    true);

  // Send the data to our app's scope once the JSON has been loaded.
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };

  xobj.send(null);
};


/**
 *  Parse the map data.
 *  @param {String} maptitle The title of the map.
 */
Pokemon.World.prototype.createMap = function(maptitle) {
  var self = this;
  this.getMapData(maptitle, function(response) {
    var data = JSON.parse(response);

    self.defineTiles(data);
  });
};


/**
 *  Parse the map data.
 *  @param {String} data Data object from the JSON file.
 */
Pokemon.World.prototype.defineTiles = function(data) {
  var self = this;

  data.forEach(function(tile) {
    var type = tile.type;
    var x = tile.pos_x;
    var y = tile.pos_y;
    var wall = tile.wall;
    var encounter = true;

    self.setTile(type, x, y);
  });
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
  // Create a PIXI texture.
  var texture = PIXI.Texture.fromImage(Pokemon.configAssets.WATERTILE);

  // Convert the texture into a PIXI sprite.
  var sprite = new PIXI.Sprite(texture);

  // Returns sprite.
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
  // Sets the tile width equal to the parameter in the config.
  tile.width = Pokemon.configTiling.TILESIZE;

  // Sets the tile height equal to the parameter in the config.
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
  // Sets the tile location. 1 equals whatever paremeter the tile config gives.
  tile.position.x = x * Pokemon.configTiling.TILESIZE;
  tile.position.y = y * Pokemon.configTiling.TILESIZE;
};


/**
 *  Re-render the scene every frame to update possible changes to the scene.
 */
Pokemon.World.prototype.animate = function() {
  requestAnimationFrame(this.animate.bind(this));
  Pokemon.configCore.RENDERER.render(Pokemon.configCore.STAGE);
};

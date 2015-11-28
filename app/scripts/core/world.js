/**
 *  Generate the world.
 *  @constructor
 */
Pokemon.World = function() {
  Pokemon.logger('Pokemon.World');

  this.mapSize = 0;

  this.init();
};


/**
 *  World init.
 */
Pokemon.World.prototype.init = function() {
  Pokemon.logger('World initialised');

  /* Read a JSON file to generate a map */
  this.createMap('testlevel');

  /* Kick off the animation loop */
  this.animate();
};


/**
 *  Load a JSON file which defines a tileset + attributes for a map.
 *  @param {String} maptitle
 *  @param {String} callback
 */
Pokemon.World.prototype.getMapData = function(maptitle, callback) {
  /* Make a request for a JSON file */
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');

  /* GET the JSON file */
  xobj.open('GET',
    Pokemon.configAssets.MAPS + maptitle + '/' + maptitle + '.json',
    true);

  /* Send the data to our app's scope once the JSON has been loaded */
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

    self.defineTiles_(data);
  });
};


/**
 *  Parse the map data.
 *  @param {String} data Data object from the JSON file.
 *  @private
 */
Pokemon.World.prototype.defineTiles_ = function(data) {
  var self = this;
  data.forEach(function(tile) {
    self.setTileSprite_(
        tile.type,
        tile.subtype,
        tile.x,
        tile.y,
        tile.wall,
        tile.encounter);
  });
};


/**
 *  @param {String} type Options: 'water', 'road' & 'rock'.
 *  @param {String} subtype Every type may have up to 4 variations.
 *  @param {Number} x The X position of the tile.
 *  @param {Number} y The Y position of the tile.
 *  @param {Boolean} wall Can the user navigate to this tile?
 *  @param {Boolean} encounter Are there encounters on this tile?
 *  @private
 */
Pokemon.World.prototype.setTileSprite_ = function(type,
    subtype, x, y, wall, encounter) {

  switch (type) {
    case 'water':
      this.createTile_(this.waterTile_(subtype), x, y);
      break;

    case 'road':
      this.createTile_(this.roadTile_(subtype), x, y);
      break;

    case 'rock':
      this.createTile_(this.rockTile_(subtype), x, y);
      break;
  }
};


/**
 *  Create main app background
 *  @param {String} subtype Variation of sprite
 *  @return {Object}
 *  @private
 */
Pokemon.World.prototype.waterTile_ = function(subtype) {

  var texture;

  if (subtype) {
    /* Create a PIXI texture */
    texture = PIXI.Texture.fromImage(
          Pokemon.configAssets.WATERTILE + subtype + '.png');
  } else {
    /* Create a PIXI texture */
    texture = PIXI.Texture.fromImage(
        Pokemon.configAssets.WATERTILE + 'water_0.png');
  }

  /* Convert the texture into a PIXI sprite */
  var sprite = new PIXI.Sprite(texture);

  /* Returns sprite */
  return sprite;
};


/**
 *  Create main app background
 *  @param {String} subtype Variation of sprite
 *  @return {Object}
 *  @private
 */
Pokemon.World.prototype.roadTile_ = function(subtype) {

  var texture;

  if (subtype) {
    /* Create a PIXI texture */
    texture = PIXI.Texture.fromImage(
          Pokemon.configAssets.ROADTILE + subtype + '.png');
  } else {
    /* Create a PIXI texture */
    texture = PIXI.Texture.fromImage(
        Pokemon.configAssets.ROADTILE + 'road.png');
  }

  /* Convert the texture into a PIXI sprite */
  var sprite = new PIXI.Sprite(texture);

  /* Returns sprite */
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

  /* Set tile size */
  this.setSize_(tile, x, y);

  /* Set tile position */
  this.setPosition_(tile, x, y);

  /* Add the tile to the scene */
  Pokemon.configCore.STAGE.addChild(tile);
};


/**
 *  Set the position on the map.
 *  @param {Object} tile The tile that gets resized/scaled.
 *  @private
 */
Pokemon.World.prototype.setSize_ = function(tile) {
  /* Sets the tile width equal to the parameter in the config */
  tile.width = Pokemon.configTiling.TILESIZE;

  /* Sets the tile height equal to the parameter in the config */
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
  /* Sets the tile location. "1" equals to tiling config parameters */
  tile.position.x = x * Pokemon.configTiling.TILESIZE;
  tile.position.y = y * Pokemon.configTiling.TILESIZE;
};


/**
 *  Re-render the scene every frame to update possible changes to the scene.
 */
Pokemon.World.prototype.animate = function() {

  /* Make sure a frame has passed before looping again */
  requestAnimationFrame(this.animate.bind(this));

  /* (re-)Render the stage. */
  Pokemon.configCore.RENDERER.render(Pokemon.configCore.STAGE);
};

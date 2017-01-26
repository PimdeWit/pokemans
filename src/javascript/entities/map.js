class GameMap {

  constructor(game, map, tileset, background) {
    this.game = game;
    const scale = this.game.config.sizes.tileScale;
    const tileSize = this.game.config.sizes.tile * scale;
    const mapSize = this.game.config.sizes.map * scale;

    this.background = this.game.add.tileSprite(0, 0, mapSize, mapSize, background);
    this.background.scale.x = this.background.scale.y = scale;

    const tilesetWidth = this.game.cache.getImage(tileset).width;
    const tilesetHeight = this.game.cache.getImage(tileset).height;

    this.instance = this.game.add.tilemap(map, tileSize, tileSize, mapSize, mapSize);

    this.instance.addTilesetImage(tileset, null, tileSize, tileSize);
    this.layer = this.instance.createLayer(0); // Create the collision layer
    this.layer.resizeWorld(); // Resize the world (to ensure its the same size as our map)
    this.instance.setCollisionByExclusion([0]); // Define which tiles are collidable
    this.layer.debug = true; // Check which tiles are collidable
  }

  getCenter() {
    return {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    };
  }
}

export default GameMap;

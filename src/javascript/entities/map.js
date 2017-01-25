class GameMap {

  constructor(game, map, tileset, background) {
    this.game = game;
    this.instance = this.game.add.tilemap(map, this.game.config.sizes.tile, this.game.config.sizes.tile);

    this.background = this.game.add.tileSprite(0, 0, this.game.config.sizes.map, this.game.config.sizes.map, background);
    this.background.scale.x = this.background.scale.y = 2;

    this.instance.addTilesetImage(tileset);
    this.layer = this.instance.createLayer(0); // Create the collision layer
    this.layer.resizeWorld(); // Resize the world (to ensure its the same size as our map)
    this.instance.setCollisionByExclusion([0]); // Define which tiles are collidable
    // this.layer.debug = true; // Check which tiles are collidable
  }

  getCenter() {
    return {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    };
  }
}

export default GameMap;

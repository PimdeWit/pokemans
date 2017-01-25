const texturePath = 'assets/textures/debug';

class MainPreload {
  constructor(game) {
    this.game = game;

    const texturePath = this.game.config.paths.textures;
    const dataPath = this.game.config.paths.data;

    this.game.load.tilemap('debug-map', `${dataPath}/debug.csv`, null, Phaser.Tilemap.CSV); // the map layout
    this.game.load.image('debug-tiles', `${texturePath}/tiles.png`); // the spritesheet for the map layout
    this.game.load.image('debug-background', `${texturePath}/debug-grid-1920x1920.png`);
    this.game.load.spritesheet('player', `${texturePath}/debug-player.png`, this.game.config.sizes.tile, this.game.config.sizes.tile, 30);
    this.game.load.json('npc-data', `${dataPath}/testlevel_npc.json`);
    this.game.load.atlas('npc-texture', `${texturePath}/npc/debug_npc.png`, `${texturePath}/npc/debug_npc.json`);
  }
}

export default MainPreload;

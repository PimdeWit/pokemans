const initialGame = {
  WIDTH: '100',
  HEIGHT: '100',
  AUTORESIZE: false,
  ANTIALIAS: false,
  TRANSPARENT: false,
  ROUND_PIXELS: true,
  BACKGROUND: 0xff0000
};

class Game {
  constructor(parent) {
    this._element = null;
    this._stage = null;

    this._createRenderer(parent);
  }

  _createRenderer() {
    this._stage = new Phaser.Game(
      initialGame.WIDTH,
      initialGame.HEIGHT,
      Phaser.WEBGL,
      parent,
      {
        preload: this.preload,
        create: this.create
      },
      initialGame.TRANSPARENT,
      initialGame.ANTIALIAS);
  }

  preload() {
    this.game.load.image('splash-title', './assets/splash/title.png');
  }

  create() {
    this.game.add.sprite(
      (this.game.width / 2) - (this.game.cache.getImage('splash-title').naturalWidth / 2),
      (this.game.height / 2) - this.game.cache.getImage('splash-title').naturalHeight, 'splash-title');
    this.game.stage.backgroundColor = 0x226db7;
  }

  get stage() {
    return this._stage;
  }
}

export default Game;

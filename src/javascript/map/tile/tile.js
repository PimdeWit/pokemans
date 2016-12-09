const TileConfig = {
  FRAME_AMOUNT: 8,
  ANIMATION_SPEED: 0.05,
  PATH: 'assets/textures/tiles/'
};

class Tile {
  constructor(tile) {
    this._sprite = null;
    this._tileObject = tile;

    this._createGraphic();
  }

  _createGraphic() {
    let texture;

    if (this._tileObject.animated) {
      this._sprite = this._createMovieClip();
      this._sprite.animationSpeed = TileConfig.ANIMATION_SPEED;
      this._sprite.play();
    } else {
      let texture = PIXI.Texture.fromImage(`${TileConfig.PATH}${this._tileObject.type}/${this._tileObject.type}_0.png`)
      this._sprite = new PIXI.Sprite(texture);
    }

    this._setSpriteSettings();
  }

  _createMovieClip() {
    let frames = [];

    for (var i = TileConfig.FRAME_AMOUNT - 1; i >= 0; i--) {
      frames.push(PIXI.Texture.fromImage(`assets/textures/tiles/${this._tileObject.type}/${this._tileObject.type}_${i}.png`));
    }

    return new PIXI.extras.AnimatedSprite(frames);
  }

  _setSpriteSettings() {
    this._sprite.width = parseInt(this._tileObject.width);
    this._sprite.height = parseInt(this._tileObject.height);
    this._sprite.x = parseInt(this._tileObject.x * this._tileObject.width);
    this._sprite.y = parseInt(this._tileObject.y * this._tileObject.height);
  }

  get sprite() {
    return this._sprite;
  }
}

export default Tile;

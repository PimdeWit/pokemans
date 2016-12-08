class Tile {
  constructor(tile) {
    this._sprite = null;
    this._tileObject = tile;

    this._createGraphic();
  }

  _createGraphic() {
    let texture = PIXI.Texture.fromImage('/assets/textures/tiles/' + this._tileObject.type + '/' + this._tileObject.type + '_0.png');

    this._sprite = new PIXI.Sprite(texture);

    this._setSpriteSettings();
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

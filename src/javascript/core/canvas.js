let initialCanvas = {
  WIDTH: 800,
  HEIGHT: 600,
  ANTIALIAS: true,
  TRANSPARENT: false,
  ROUND_PIXELS: true,
  BACKGROUND: 0xff0000
}

class Canvas {
  constructor(parent) {
    this._element = null;
    this._renderer = null;
    this._stage = null;

    this._createRenderer();

    parent.appendChild(this._element);

    this._createStage();
  }

  _createRenderer() {
    this._renderer = new PIXI.WebGLRenderer(
        initialCanvas.WIDTH,
        initialCanvas.HEIGHT,
        {
          transparent: initialCanvas.TRANSPARENT,
          antialias: initialCanvas.ANTIALIAS,
          roundPixels: initialCanvas.ROUND_PIXELS
        });

    this._renderer.backgroundColor = initialCanvas.BACKGROUND;
    this._element = this._renderer.view;
  }

  _createStage() {
    this._stage = new PIXI.Container();
  }

  /**
   * ---------------------------
   */

  set width(value) {
    this._element.width = value;
  }

  set height(value) {
    this._element.height = value;
  }

  get element() {
    return this._element;
  }

  get renderer() {
    return this._renderer;
  }

  get stage() {
    return this._stage;
  }
}

export default Canvas;

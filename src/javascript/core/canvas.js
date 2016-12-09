const initialCanvas = {
  WIDTH: 800,
  HEIGHT: 600,
  AUTORESIZE: false,
  ANTIALIAS: true,
  TRANSPARENT: true,
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
          autoResize: initialCanvas.AUTORESIZE,
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

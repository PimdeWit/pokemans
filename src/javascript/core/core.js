import Canvas from './canvas.js';
import MapController from '../map/mapController.js';

class Pokemans {
  constructor(parent) {
    this.canvas = new Canvas(parent);
    this.resize();

    this.mapController = new MapController(this.canvas);
    this.mapController.setCurrentMap('testlevel');

    this.addEventListeners();

    this.animate();

    setTimeout(() => {
      this.mapController.tiles.forEach(tile =>  {
        this.canvas.stage.addChild(tile.sprite);
      });

      this.render();
    }, 128);
  }

  addEventListeners() {
    window.addEventListener('resize', event => this.resize());
  }

  resize(width = this.canvas.element.parentNode.clientWidth,
         height = this.canvas.element.parentNode.clientHeight) {
    this.canvas.renderer.resize(width, height);
    this.render();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    this.canvas.renderer.render(this.canvas.stage);
  }
}

export default Pokemans;

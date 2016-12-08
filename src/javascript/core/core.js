import Canvas from './canvas.js';
import MapController from '../map/mapController.js';

class Pokemans {
  constructor(parent) {
    this.canvas = new Canvas(parent);
    this.resize();

    this.mapController = new MapController(this.canvas);
    this.mapController.setCurrentMap('testlevel');

    setTimeout(() => {
      this.mapController.tiles.forEach(tile =>  {
        this.canvas.stage.addChild(tile.sprite);
      });

      this.render();
    }, 32);
  }

  addEventListeners() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.canvas.width = this.canvas.element.parentNode.clientWidth;
    this.canvas.height = this.canvas.element.parentNode.clientHeight;
    this.render();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
  }

  render() {
    this.canvas.renderer.render(this.canvas.stage);
  }
}

export default Pokemans;

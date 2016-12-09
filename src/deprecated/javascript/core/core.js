import Game from './game.js';
import MapController from '../map/mapController.js';

const initialGame = {
  WIDTH: '100',
  HEIGHT: '100',
  AUTORESIZE: false,
  ANTIALIAS: true,
  TRANSPARENT: false,
  ROUND_PIXELS: true,
  BACKGROUND: 0xff0000
};


class Pokemans {
  constructor(parent) {
    this.game = new Game(parent);

    this.mapController = new MapController(this.game);
    this.mapController.setCurrentMap('testlevel');

    this.addEventListeners();

    // this.animate();

    setTimeout(() => {
      this.mapController.tiles.forEach(tile =>  {
        this.game.stage.add.sprite(tile.sprite);
      });
      console.log(this.game.stage);
    }, 128);
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.resize());
  }

  resize(width = 800,
         height = 600) {
    this.game.stage.scale.setGameSize(width, height);
  }
}

export default Pokemans;

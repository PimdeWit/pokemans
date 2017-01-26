import Boot from './states/Boot';
import Preload from './states/Preload';
import GameTitle from './states/GameTitle';
import Main from './states/Main';
import GameOver from './states/GameOver';

const initialGame = {
  WIDTH: '100',
  HEIGHT: '100',
  ANTIALIAS: false,
  TRANSPARENT: false,
};

class Pokemans extends Phaser.Game {
  constructor(parent) {

    super(window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
      Phaser.CANVAS, parent, null, initialGame.TRANSPARENT, initialGame.ANTIALIAS);

    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('GameTitle', GameTitle, false);
    this.state.add('Main', Main, false);
    this.state.add('GameOver', GameOver, false);

    this.state.start('Boot');
  }
}

window.onload = function() {
  document.body.style.margin = 0;
  document.body.style.minHeight = '100vh';
  let app = new Pokemans(document.body);
};

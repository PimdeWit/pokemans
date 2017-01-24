class Preload extends Phaser.State {

  preload() {
    this.game.load.image('splash-title', './assets/splash/title.png');
  }

  create() {
    console.log('Attempting to start main app');
    this.game.state.start('GameTitle');
  }

}

export default Preload;

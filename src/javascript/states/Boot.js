class Boot extends Phaser.State {

  preload() {
    console.log('Booting up');
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.state.start('Preload');
  }

}

export default Boot;
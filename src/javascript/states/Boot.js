class Boot extends Phaser.State {

  preload() {
    console.log('running boot');
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.state.start('Preload');
  }

}

export default Boot;
class GameTitle extends Phaser.State {

  create() {
    this.game.add.sprite(
      (this.game.width / 2) - (this.game.cache.getImage('splash-title').naturalWidth / 2),
      (this.game.height / 2) - this.game.cache.getImage('splash-title').naturalHeight, 'splash-title');
    this.game.stage.backgroundColor = 0x226db7;
  }

  startGame() {
    this.game.state.start('Main');
  }

}

export default GameTitle;

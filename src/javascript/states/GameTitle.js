class GameTitle extends Phaser.State {

  create() {
    this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'splash-title');
    this.title.anchor.x = this.title.anchor.y = 0.5;
    this.game.stage.backgroundColor = 0x226db7;

    setTimeout(function() {
      this.startGame();
    }.bind(this), 1000);
  }

  startGame() {
    this.game.state.start('Main');
  }

}

export default GameTitle;

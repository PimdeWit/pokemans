class Cursors {
  constructor(game) {
    this.game = game;

    this.keys = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      upArrow: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      downArrow: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      leftArrow: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      rightArrow: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    }
  }
}

export default Cursors;

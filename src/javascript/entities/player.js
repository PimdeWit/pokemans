class Player {

  constructor(game, spawn, sprite) {
    this.game = game;

    // this.velocity = 213.33333334;
    this.velocity = 106.6666667 * this.game.config.sizes.tileScale;

    // The player position on the map.
    this.position = spawn || {
      x: 0,
      y: 0
    };

    this.instance = this.game.add.sprite(this.position.x, this.position.y, sprite);
    this.instance.scale.x = this.instance.scale.y = this.game.config.sizes.tileScale;
    this.instance.anchor.x = this.instance.anchor.y = 0;

    this.game.physics.enable(this.instance, Phaser.Physics.ARCADE);

    this._setAnimations();
  }

  _setAnimations() {
    this.instance.animations.add('left', [6, 7, 8, 9], 10, true);
    this.instance.animations.add('right', [16, 17, 18, 19], 10, true);
    this.instance.animations.add('up', [11, 12, 13, 14], 10, true);
    this.instance.animations.add('down', [1, 2, 3, 4], 10, true);
  }

  setPosition(position) {
    this.position = {
      x: position.x || this.position.x,
      y: position.y || this.position.y
    }

    this._teleportPlayer();
  }

  _teleportPlayer() {
    this.instance.x = Phaser.Math.snapTo(this.position.x, (this.game.config.sizes.tile * this.game.config.sizes.tileScale));
    this.instance.y = Phaser.Math.snapTo(this.position.y, (this.game.config.sizes.tile * this.game.config.sizes.tileScale));
  }

  snapToGrid(gridCellSize = (this.game.config.sizes.tile * this.game.config.sizes.tileScale)) {
    this.instance.body.velocity.set(0);
    this.instance.x = Phaser.Math.snapTo(this.instance.x, gridCellSize);
    this.instance.y = Phaser.Math.snapTo(this.instance.y, gridCellSize);
  }

  moveToActiveDirection(cursors) {
    this.snapToGrid((this.game.config.sizes.tile * this.game.config.sizes.tileScale));

    if (cursors.up.isDown || cursors.upArrow.isDown) {
      this.instance.body.velocity.y = -this.velocity;
      this.instance.lastDirection = 10;
      this.instance.play('up');
    } else if (cursors.down.isDown || cursors.downArrow.isDown) {
      this.instance.body.velocity.y = this.velocity;
      this.instance.lastDirection = 0;
      this.instance.play('down');
    } else if (cursors.left.isDown || cursors.leftArrow.isDown) {
      this.instance.body.velocity.x = -this.velocity;
      this.instance.lastDirection = 5;
      this.instance.play('left');
    } else if (cursors.right.isDown || cursors.rightArrow.isDown) {
      this.instance.body.velocity.x = this.velocity;
      this.instance.lastDirection = 15;
      this.instance.play('right');
    } else {
      this.instance.animations.stop();
      this.instance.frame = this.instance.lastDirection || 0;
    }
  }
}

export default Player;

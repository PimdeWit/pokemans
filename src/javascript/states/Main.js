const timerCount = 600;
const mapSize = 2240;
const tileSize = 32;
const playerVelocity = 160;

class Main extends Phaser.State {

  preload() {
    this.game.load.tilemap('debug-map', 'assets/data/maps/debug.csv', null, Phaser.Tilemap.CSV); // the map layout
    this.game.load.image('debug-tiles','assets/textures/debug/tiles.png'); // the spritesheet for the map layout

    this.game.load.image('debug-background','assets/textures/debug/debug-grid-1920x1920.png');

    // this.game.load.image('player','assets/textures/debug/debug-player.png');
    this.game.load.spritesheet('player', 'assets/textures/debug/debug-player.png', 32, 32, 30);
  }

  create() {
    this.counter = 0;

    // Add the background
    // this.game.add.tileSprite(0, 0, mapSize, mapSize, 'debug-background');

    // Create the map
    this.map = this.game.add.tilemap('debug-map', tileSize, tileSize);
    // Add the spritesheet that populates the map
    this.map.addTilesetImage('debug-tiles');

    // Create the collision layer
    this.layer = this.map.createLayer(0);
    // Resize the world (to ensure its the same size as our map)
    this.layer.resizeWorld();
    // Define which tiles are collidable
    this.map.setCollisionByExclusion([0]);
    // Check which tiles are collidable
    this.layer.debug = true;

    // this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player', 1);
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    this.player.frame = 0;
    this.player.animations.add('left', [6, 7, 8, 9], 10, true);
    this.player.animations.add('right', [16, 17, 18, 19], 10, true);
    this.player.animations.add('up', [11, 12, 13, 14], 10, true);
    this.player.animations.add('down', [1, 2, 3, 4], 10, true);
    this.player.anchor.x = this.player.anchor.y = 0;
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.drag = 0.01;

    this.text = this.game.add.text(32, 160, 'interval steps since start: 0', {font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.text.anchor.setTo(0, 0);
    this.text.fixedToCamera = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);

    this.game.time.events.loop(timerCount, this.nextStep, this);
  }

  onPlayerContact() {
    console.log('hello');
  }

  collisionHandler() {
    console.log('they are totally touching');
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.layer, this.collisionHandler, null, this);
  }
  
  nextStep() {

    this.updateCounter(this.counter++);

    this.player.body.velocity.set(0);

    this.updateAllowed = false;

    if (this.cursors.up.isDown) {
      // this.player.y = Phaser.Math.snapTo(this.player.y - tileSize, tileSize);
      this.player.body.velocity.y = -playerVelocity;
      this.player.play('up');
    } else if (this.cursors.down.isDown) {
      // this.player.y = Phaser.Math.snapTo(this.player.y + tileSize, tileSize);
      this.player.body.velocity.y = playerVelocity;
      this.player.play('down');
    } else if (this.cursors.left.isDown) {
      // this.player.x = Phaser.Math.snapTo(this.player.x - tileSize, tileSize);
      this.player.body.velocity.x = -playerVelocity;
      this.player.play('left');
    } else if (this.cursors.right.isDown) {
      // this.player.x = Phaser.Math.snapTo(this.player.x + tileSize, tileSize);
      this.player.body.velocity.x = playerVelocity;
      this.player.play('right');
    } else {
      this.player.animations.stop();
    }


  }

  updateCounter(count) {
    this.text.setText('interval steps since start: ' + count);
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, tileSize, tileSize);
    this.game.debug.spriteCoords(this.player, tileSize, 500);
  }

}

export default Main;

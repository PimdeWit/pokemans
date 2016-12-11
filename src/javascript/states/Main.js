const timerCount = 300;
const mapSize = 1920;
const tileSize = 32;
const texturePath = 'assets/textures/debug';
const dataPath = 'assets/data/maps';
const playerVelocity = 106.666667;

class Main extends Phaser.State {

  preload() {
    this.npc = {};
    this.game.load.tilemap('debug-map', `${dataPath}/debug.csv`, null, Phaser.Tilemap.CSV); // the map layout
    this.game.load.image('debug-tiles', `${texturePath}/tiles.png`); // the spritesheet for the map layout

    this.game.load.image('debug-background', `${texturePath}/debug-grid-1920x1920.png`);
    this.game.load.spritesheet('player', `${texturePath}/debug-player.png`, 32, 32, 30);

    this.game.load.json('npc-data', `${dataPath}/testlevel_npc.json`);
    // this.game.load.image('npcTexture', 'assets/pics/ra_einstein.png');

    this.game.load.atlas('npc-texture', `${texturePath}/npc/debug_npc.png`, `${texturePath}/npc/debug_npc.json`);
  }

  fetchMapJson(url) {
    return fetch(url)
      .then(function(response) {
        return response.json()
      })
  }

  create() {
    console.log('main started');
    this.counter = 0;

    this.npcData = this.game.cache.getJSON('npc-data');

    // Add the background
    this.game.add.tileSprite(0, 0, mapSize, mapSize, 'debug-background');
    this._createMap();
    this._createLayer();
    this._createPlayer();
    this.addNPCs();
    this._debugText();
    this.addEventListeners();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
    this.game.time.events.loop(timerCount, this.nextStep, this);
  }

  addEventListeners() {
    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.actionKey.onDown.add(this.checkAction, this);
  }

  addNPCs() {
    this.npcData.forEach(function(npc, index) {
      this.npc[npc.keyid] = this.game.add.sprite(640 + (160 * index), 640, 'npc-texture');
      this.npc[npc.keyid].frameName = `${npc.keyid}.png`;
      this.npc[npc.keyid].name = npc.properties.name;
      this.npc[npc.keyid].message = npc.properties.message;
      this.game.physics.enable(this.npc[npc.keyid], Phaser.Physics.ARCADE);
    }.bind(this));
  }

  checkAction() {
    this.textbox = document.querySelector('.textbox');

    Object.keys(this.npc).forEach(function(name) {
      let npc = this.npc[name];
      if (Phaser.Math.distance(this.player.x, this.player.y, npc.x, npc.y) <= tileSize * 2) {
        if (this.textbox) {
          this.textbox.remove();
          this._toggleControls();
          this.textboxActive = false;
          return;
        }

        let textbox = document.createElement('div');
        textbox.classList.add('textbox');
        textbox.innerHTML = `<header class="textbox__header"><p class="textbox__speaker">${npc.name}</p></header><p class="textbox__paragraph">Hi, I'm ${name}<br>${npc.message}</p>`;
        document.querySelector('.textwrapper').append(textbox);

        this.textboxActive = true;
      }
    }.bind(this));

    if (this.textboxActive) {
      this._toggleControls();
    }

  }

  _toggleControls() {
    Object.keys(this.cursors).forEach(function(direction) {
      this.cursors[direction].enabled = !this.cursors[direction].enabled;
    }.bind(this));
  }

  _createMap() {
    // Create the map
    this.map = this.game.add.tilemap('debug-map', tileSize, tileSize);
    // Add the spritesheet that populates the map
    this.map.addTilesetImage('debug-tiles');
  }

  _createLayer() {
    // Create the collision layer
    this.layer = this.map.createLayer(0);
    // Resize the world (to ensure its the same size as our map)
    this.layer.resizeWorld();
    // Define which tiles are collidable
    this.map.setCollisionByExclusion([0]);
    // Check which tiles are collidable
    // this.layer.debug = true;
  }

  _createPlayer() {
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    this.player.animations.add('left', [6, 7, 8, 9], 10, true);
    this.player.animations.add('right', [16, 17, 18, 19], 10, true);
    this.player.animations.add('up', [11, 12, 13, 14], 10, true);
    this.player.animations.add('down', [1, 2, 3, 4], 10, true);
    this.player.anchor.x = this.player.anchor.y = 0;
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
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

    // Make sure the sprite is on the grid
    this.player.x = Phaser.Math.snapTo(this.player.x, tileSize);
    this.player.y = Phaser.Math.snapTo(this.player.y, tileSize);

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
    Object.keys(this.npc).forEach(function(npc) {
      this.game.debug.geom(this.npc[npc], '#0fffff');
    }.bind(this));

    this.game.debug.cameraInfo(this.game.camera, tileSize, tileSize);
    this.game.debug.spriteCoords(this.player, tileSize, 500);
  }

  _debugText() {
    this.text = this.game.add.text(32, 160, 'interval steps since start: 0', {font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.text.anchor.setTo(0, 0);
    this.text.fixedToCamera = true;
  }

}

export default Main;

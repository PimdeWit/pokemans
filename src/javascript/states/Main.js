const timerCount = 300;
const mapSize = 3840;
const tileSize = 64;
const texturePath = 'assets/textures/debug';
const dataPath = 'assets/data/maps';
const playerVelocity = 213.33333334;

class Main extends Phaser.State {

  preload() {
    this.npc = {};
    this.game.load.tilemap('debug-map', `${dataPath}/debug.csv`, null, Phaser.Tilemap.CSV); // the map layout
    this.game.load.image('debug-tiles', `${texturePath}/tiles.png`); // the spritesheet for the map layout

    this.game.load.image('debug-background', `${texturePath}/debug-grid-1920x1920.png`);
    this.game.load.spritesheet('player', `${texturePath}/debug-player.png`, tileSize, tileSize, 30);

    this.game.load.json('npc-data', `${dataPath}/testlevel_npc.json`);

    this.game.load.atlas('npc-texture', `${texturePath}/npc/debug_npc.png`, `${texturePath}/npc/debug_npc.json`);
  }

  fetchMapJson(url) {
    return fetch(url)
      .then((response) => {
        return response.json()
      })
  }

  create() {
    this.counter = 0;

    this.npcData = this.game.cache.getJSON('npc-data');

    // Add the background
    this.background = this.game.add.tileSprite(0, 0, mapSize, mapSize, 'debug-background');
    this._setupTransition();
    this._createMap();
    this._createLayer();
    this._createPlayer();
    this._addNPCs();
    this._debugText();
    this.addEventListeners();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
    this.game.time.events.loop(timerCount, this.triggerStep, this);
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

  _addNPCs() {
    this.npcData.forEach((npc, index) => {
      this.npc[npc.keyid] = this.game.add.sprite(1280 + (320 * index), 1280, 'npc-texture');
      this.npc[npc.keyid].frameName = `${npc.keyid}.png`;
      this.npc[npc.keyid].name = npc.properties.name;
      this.npc[npc.keyid].message = npc.properties.message;
      this.npc[npc.keyid].creatures = npc.properties.creatures;
      this.game.physics.enable(this.npc[npc.keyid], Phaser.Physics.ARCADE);
      this.npc[npc.keyid].body.immovable = true;
    });
  }

  // TODO: Needs big refactoring, what a fucking mess.
  checkAction() {
    this.textbox = document.querySelector('.textbox');

    Object.keys(this.npc).forEach((name) => {
      let npc = this.npc[name];
      if (Phaser.Math.distance(this.player.x, this.player.y, npc.x, npc.y) <= tileSize * 2) {
        if (this.textbox) {
          document.querySelector('.battle.overlay').classList.remove('active');
          this.isInBattle = false;
          this.hideTransition(this.transitionSlices);

          this.textbox.remove();
          this._toggleControls();
          this.textboxActive = false;
          return;
        }

        let textbox = document.createElement('div');
        textbox.classList.add('textbox');
        textbox.innerHTML = `<header class="textbox__header"><p class="textbox__speaker">${npc.name}</p></header><p class="textbox__paragraph">Hi, I'm ${name}<br>${npc.message}</p>`;
        document.querySelector('.textwrapper').append(textbox);

        this.engageBattle(this.npc.joey);

        this.textboxActive = true;
      }
    });

    if (this.textboxActive) {
      this._toggleControls();
    }
  }

  /**
   * Prepares the battle background effect.
   */
  _setupTransition() {
    let motion = { x: 0};
    let tween = this.game.add.tween(motion).to( { x: 320 }, 900, 'Bounce.easeInOut', true, 0, -1, true);
    this.waveform = tween.generateData(200);
    this.transitionSlices = [];

    let textureWidth = this.background.width;
    let textureHeight = this.background.height;

    let sliceHeight = 16;

    for (let slice = 0; slice < Math.floor(textureHeight / sliceHeight); slice++) {
      let star = this.game.add.sprite(400, 0 + (slice * sliceHeight), this.background.key);
      star.crop(new Phaser.Rectangle(0, slice * sliceHeight, textureWidth, sliceHeight));
      star.ox = star.x;
      star.cx = this.game.math.wrap(slice * 2, 0, this.waveform.length - 1);
      star.anchor.set(0.25);
      this.transitionSlices.push(star);
    }

    this.hideTransition(this.transitionSlices);
  }

  hideTransition(sprites) {
    sprites.forEach((sprite) => {
      sprite.alpha = 0;
    });
  }

  showTransition(sprites) {
    this.game.camera.shake(0.01, 500);
    sprites.forEach((sprite) => {
      sprite.alpha = 1;
    });
  }

  engageBattle(enemy) {
    console.warn('BATTLE ENGAGED !1!!!');

    this.prepareBattleDom(enemy);

    this.isInBattle = true;
    this.showTransition(this.transitionSlices);
  }

  prepareBattleDom(enemy) {
    let parent = document.querySelector('.battle.overlay');
    let enemyNameContainer = document.querySelector('.battle__enemy__name');
    let enemyCreaturesContainer = document.querySelector('.battle__enemy .battle__list');
    let enemySprite = document.querySelector('.battle__enemy .battle__sprite');

    enemy.creatures.forEach((creature, i) => {
      console.log(creature);
      let creatureElement = enemyCreaturesContainer.children[i];
      creatureElement.classList.add('active');
      creatureElement.innerText = creature.name;
    });

    enemyNameContainer.innerText = enemy.name;
    enemySprite.src = `${texturePath}/creature/${enemy.creatures[0].name}.png`;
    parent.classList.add('active');
  }

  _toggleControls() {
    Object.keys(this.cursors).forEach((direction) => {
      this.cursors[direction].enabled = !this.cursors[direction].enabled;
    });
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
    this.layer.debug = true;
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
    // Check if player is colliding with 'wall'.
    this.game.physics.arcade.collide(this.player, this.layer, this.collisionHandler, null, this);

    // Check if player is colliding with 'npc'.
    Object.keys(this.npc).forEach((npc) => {
      this.game.physics.arcade.collide(this.player, this.npc[npc], this.collisionHandler, null, this);
    });

    if (this.isInBattle) {
      this.drawBattleEffect();
    }
  }

  drawBattleEffect() {
    for (let i = 0, len = this.transitionSlices.length; i < len; i++) {
      this.transitionSlices[i].x = this.transitionSlices[i].ox + this.waveform[this.transitionSlices[i].cx].x;
      this.transitionSlices[i].cx++;
      if (this.transitionSlices[i].cx > this.waveform.length - 1) {
        this.transitionSlices[i].cx = 0;
      }
    }
  }

  triggerStep() {

    this.updateCounter(this.counter++);

    this.player.body.velocity.set(0);

    // Make sure the sprite is on the grid
    this.player.x = Phaser.Math.snapTo(this.player.x, tileSize);
    this.player.y = Phaser.Math.snapTo(this.player.y, tileSize);

    this.moveToActiveDirection();
  }

  // How do i make this cleaner?
  moveToActiveDirection() {
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -playerVelocity;
      this.player.play('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = playerVelocity;
      this.player.play('down');
    } else if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -playerVelocity;
      this.player.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = playerVelocity;
      this.player.play('right');
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
    }
  }

  updateCounter(count) {
    this.text.setText('interval steps since start: ' + count);
  }

  render() {
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

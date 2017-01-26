import MainPreload from '../entities/mainPreload.js';
import Cursors from '../entities/cursors.js';
import Player from '../entities/player.js';
import GameMap from '../entities/map.js';
import NPCs from '../entities/npcs.js';

class Main extends Phaser.State {

  preload() {
    this.game.config = {
      stepTimerInterval: 300,
      sizes: {
        tile: 32,
        tileScale: 1,
        map: 1920
      },
      paths: {
        textures: 'assets/textures/debug',
        data: 'assets/data/maps'
      }
    };

    new MainPreload(this.game);
  }

  fetchMapJson(url) {
    return fetch(url)
      .then((response) => {
        return response.json()
      })
  }

  create() {
    this.npcData = this.game.cache.getJSON('npc-data');
    this.map = new GameMap(this.game, 'debug-map', 'debug-tiles', 'debug-background');
    this.player = new Player(this.game, this.map.getCenter(), 'player');
    this.npc = new NPCs(this.game, this.npcData).character;
    this.cursors = new Cursors(this.game).keys;

    this._setupTransition();
    this._addEventListeners();

    this.game.camera.follow(this.player.instance, Phaser.Camera.FOLLOW_LOCKON, 0.025, 0.025);
    this.game.time.events.loop(this.game.config.stepTimerInterval, this.triggerStep, this);
  }

  _addEventListeners() {
    this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.actionKey.onDown.add(this.checkAction, this);
  }

  // TODO: Needs big refactoring, what a fucking mess.
  checkAction() {
    this.textbox = document.querySelector('.textbox');

    Object.keys(this.npc).forEach((name) => {
      let npc = this.npc[name];
      if (Phaser.Math.distance(this.player.instance.x, this.player.instance.y, npc.x, npc.y) <= (this.game.config.sizes.tile * this.game.config.sizes.tileScale) * 2) {
        if (this.textbox) {
          document.querySelector('.battle.overlay').classList.remove('active');
          this.isInBattle = false;
          this.transitionBattleEffect(this.transitionSlices, 0, 0);

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

  // Prepares the battle background effect.
  _setupTransition() {
    let motion = {x: 0};
    let bg = this.map.background;
    let tween = this.game.add.tween(motion).to({x: ((this.game.config.sizes.tile * this.game.config.sizes.tileScale) / 2) * 10}, 900, 'Bounce.easeInOut', true, 0, -1, true);
    this.waveform = tween.generateData(200);
    this.transitionSlices = [];

    let sliceHeight = 16;

    for (let slice = 0; slice < Math.floor(bg.height / sliceHeight); slice++) {
      let star = this.game.add.sprite(400, 0 + (slice * sliceHeight), bg.key);
      star.crop(new Phaser.Rectangle(0, slice * sliceHeight, bg.width, sliceHeight));
      star.ox = star.x;
      star.cx = this.game.math.wrap(slice * 2, 0, this.waveform.length - 1);
      star.anchor.set(0.25);
      this.transitionSlices.push(star);
    }

    this.transitionBattleEffect(this.transitionSlices, 0, 0);
  }

  transitionBattleEffect(sprites, alpha, speed = 500) {

    // Figure out performant way of doing this.
    // sprites.forEach((sprite, index) => {
    //   this.game.add.tween(sprite).to({alpha: alpha}, speed * index, 'Cubic.easeInOut', true,)
    // });

    sprites.forEach((sprite, index) => {
      sprite.alpha = alpha;
    });
  }

  engageBattle(enemy) {
    this.game.camera.shake(0.01, 500);
    console.warn('BATTLE ENGAGED !1!!!');

    this.prepareBattleDom(enemy);

    this.isInBattle = true;
    this.transitionBattleEffect(this.transitionSlices, 1, 200);
  }

  prepareBattleDom(enemy) {
    let parent = document.querySelector('.battle.overlay');
    let enemyNameContainer = document.querySelector('.battle__enemy__name');
    let enemyCreaturesContainer = document.querySelector('.battle__enemy .battle__list');
    let enemySprite = document.querySelector('.battle__enemy .battle__sprite');
    const texturePath = this.game.config.paths.textures;

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

  _checkForCollision() {
    // Check if player is colliding with 'wall'.
    this.game.physics.arcade.collide(this.player.instance, this.map.layer, this.collisionHandler, null, this);

    // Check if player is colliding with 'npc'.
    Object.keys(this.npc).forEach((npc) => {
      this.game.physics.arcade.collide(this.player.instance, this.npc[npc], this.collisionHandler, null, this);
    });
  }

  collisionHandler() {
    console.log('they are totally touching');
    this.player.snapToGrid();
  }

  update() {
    this._checkForCollision();

    if (this.isInBattle) {
      this._drawBattleEffect();
    }
  }

  _drawBattleEffect() {
    for (let i = 0, len = this.transitionSlices.length; i < len; i++) {
      this.transitionSlices[i].x = this.transitionSlices[i].ox + this.waveform[this.transitionSlices[i].cx].x;
      this.transitionSlices[i].cx++;
      if (this.transitionSlices[i].cx > this.waveform.length - 1) {
        this.transitionSlices[i].cx = 0;
      }
    }
  }

  triggerStep() {
    this.player.moveToActiveDirection(this.cursors);
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, (this.game.config.sizes.tile * this.game.config.sizes.tileScale), (this.game.config.sizes.tile * this.game.config.sizes.tileScale));
    this.game.debug.spriteCoords(this.player.instance, (this.game.config.sizes.tile * this.game.config.sizes.tileScale), 500);
  }
}

export default Main;

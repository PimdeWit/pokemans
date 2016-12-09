class Main extends Phaser.State {

  create() {
    console.info('Starting main app');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.stage.backgroundColor = '#cecece';
  }

  update() {

  }

}

export default Main;

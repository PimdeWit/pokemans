class NPCs {

  constructor(game, npcData) {
    this.game = game;

    this.character = {};

    npcData.forEach((npc, index) => {
      this.character[npc.keyid] = this.game.add.sprite(1280 + (320 * index), 1280, 'npc-texture');
      this.character[npc.keyid].frameName = `${npc.keyid}.png`;
      this.character[npc.keyid].name = npc.properties.name;
      this.character[npc.keyid].message = npc.properties.message;
      this.character[npc.keyid].creatures = npc.properties.creatures;
      this.game.physics.enable(this.character[npc.keyid], Phaser.Physics.ARCADE);
      this.character[npc.keyid].body.immovable = true;
    });
  }

}

export default NPCs;

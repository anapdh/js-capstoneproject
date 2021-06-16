import 'phaser';

let platforms;
let player;

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    //this.load.image('logo', 'assets/logo.png');
    this.load.image('bg', 'assets/background.png');
    this.load.spritesheet('block', 'assets/wheels_sheet.png', { frameWidth: 66, frameHeight: 64 });
  }

  create () {
    //this.add.image(400, 300, 'logo');
    this.add.image(400, 300, 'bg')
    let block1 = this.add.sprite(400, 500, 'block', 11)
    let block2 = this.add.sprite(600, 500, 'block', 0)
  }
};

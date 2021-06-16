import 'phaser';

let platforms;
let player;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    //this.load.image('logo', 'assets/logo.png');
    this.load.image('bg', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('bunny', 'assets/bunny-sheet.png', { frameWidth: 48, frameHeight: 32 })
    this.load.spritesheet('block', 'assets/wheels_sheet.png', { frameWidth: 66, frameHeight: 64 });
  }

  create() {
    this.add.image(400, 300, 'bg')
    this.add.image(400, 570, 'ground')

    //PLATFORM GROUP
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 565, 'ground').setScale(2).refreshBody();

    //PLAYER GROUP
    player = this.physics.add.sprite(100, 520, 'bunny');

    this.anims.create({
      key: 'left', // dude to the left - going straight
      frames: this.anims.generateFrameNumbers('bunny', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn', // turnig around
      frames: [{ key: 'bunny', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right', //dude to the right - going back
      frames: this.anims.generateFrameNumbers('bunny', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });


    //BLOCK GROUP
    let block1 = this.add.sprite(400, 502, 'block', 11)
    let block2 = this.add.sprite(600, 503, 'block', 0)
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys(); // creates cursor moves for player
    if (cursors.left.isDown) { // isDown = holded down
      player.setVelocityX(-160);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) { // jump
      player.setVelocityY(-550);
    }
  }
};

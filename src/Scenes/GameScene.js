import 'phaser';

let platforms;
let player;
let stars;
let obstacles;

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
    this.load.image('star', 'assets/star.png');
  }

  create() {
    
  const width = this.scale.width
  const height = this.scale.height

  this.add.image(createAlignedBg(this, 2, 'bg', 0.50))

    this.add.image(400, 570, 'ground')

    // ========================= PLATFORM GROUP =========================

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 565, 'ground').setScale(2).refreshBody();

    // ========================= PLAYER GROUP =========================

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

    this.physics.add.collider(player, platforms);

    // ========================= STARS GROUP =========================

    stars = this.physics.add.group()
    stars.enableBody = true;
    stars.create(400, 300, 'star');

    // Create some enemies.
    for (let i = 0; i < 1; i++)
    {
      createStar();
    }
    // Tap to create new baddie sprites.
    //game.input.onTap.add(createStar, this);

    // ========================= BLOCK GROUP =========================

    let block1 = this.add.sprite(400, 502, 'block', 11)
    let block2 = this.add.sprite(600, 503, 'block', 0)

    this.cameras.main.setBounds(0, 0, width * 3)
  }

  update() {
    // MOVE PLAYER WITH CURSOR
    let cursors = this.input.keyboard.createCursorKeys();
    const cam = this.cameras.main
    const speed = 2

    if (cursors.left.isDown) {
      player.setVelocityX(-120);

      player.anims.play('left', true);
      cam.scrollX -= speed
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(120);

      player.anims.play('right', true);
      cam.scrollX += speed
    }
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown) { // jump
      player.setVelocityY(-400);
    }

    createStar();
  }
};

// function getRandomArbitrary() {
//   return Math.random() * (600 - 325) + 325;
// }

//randomly generates star
function createStar() {
  let star = stars.create((360 + Math.random() * 200, 120 + Math.random() * 200, 'star'));
  moveIndividual(star);
}

function moveIndividual(moved) {
  moved.body.velocity.y = 400;
}

const createAlignedBg = (scene, count, texture, scrollFactor) => {
  let bgX = 0;
  for (let i = 0; i < count; i++) {
    const repeat = scene.add.image(bgX, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor)

      bgX += repeat.width
  }
}

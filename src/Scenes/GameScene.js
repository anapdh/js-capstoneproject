import 'phaser';

// global game options
let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [100, 300],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("bg", 'assets/background.png');
    this.load.image("platform", "assets/building.png");
    this.load.spritesheet('player', 'assets/bunny-sheet2.png', { frameWidth: 48, frameHeight: 32 })
  }

  create() {

    this.add.image(400, 300, 'bg')

    // ==================== PLATFORM GROUP ====================
    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform)
      }
    });

    // pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform)
      }
    });

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(500, 250);

    // ==================== PLAYER GROUP ====================
    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, 300, "player");
    this.player.setGravityY(gameOptions.playerGravity);

    // player animation
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('move');
      }
    }, null);

    // checking for input
    this.input.on("pointerdown", this.jump, this);
  }

  update() {
    // game over
    if (this.player.y > 600) {
      this.scene.start("Game"); // game over here
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = 800;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = 800 - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < - platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2);
    }
  }

  // FUNCTIONS

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.image(posX, Phaser.Math.Between(400, 600), "platform");
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      platform.setFrictionX(0);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }
};


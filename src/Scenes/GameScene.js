import 'phaser';

let score = 0;
let scoreText;

let gameOptions = {
  // global game options
  // platform speed range, in pixels per second
  platformSpeedRange: [300, 300],
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],
  // platform width range, in pixels
  platformSizeRange: [90, 300],
  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],
  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,
  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],
  // player gravity
  playerGravity: 900,
  // player jump force
  jumpForce: 400,
  // player starting X position
  playerStartPosition: 200,
  // consecutive jumps allowed
  jumps: 2,
  // % of probability a coin appears on the platform
  coinPercent: 50
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {

    this.add.image(400, 300, 'bg');

    // ==================== PLATFORM GROUP ====================
    // group with all active platforms.
    this.addedPlatforms = 0;
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

    // ==================== COIN GROUP ====================

    this.coinGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback: function (coin) {
        coin.scene.coinPool.add(coin)
      }
    });

    // coin pool
    this.coinPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: function (coin) {
        coin.scene.coinGroup.add(coin)
      }
    });

    this.addPlatform(500, 600, 550);
    
    // ==================== PLAYER GROUP ====================
    
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, 300, "player");
    this.player.setGravityY(gameOptions.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('move');
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.coinGroup, function (player, coin) {
      score += 10;
      scoreText.setText('Score: ' + score);
      this.tweens.add({
        targets: coin,
        y: coin.y - 100,
        alpha: 0,
        duration: 800,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete: function () {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
        }
      });
    }, null, this);

    // checking for input
    this.input.on("pointerdown", this.jump, this);

    // SCORES
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })
  }

  update() {
    // game over
    if (this.player.y > 600) {
      this.scene.start("Game")
      //game over comes here when created ("GameOver", { score: Phaser.Math.RoundTo(this.score, 0) });
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = 800;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(platform => {
      let platformDistance = 800 - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < - platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // recycling coins
    this.coinGroup.getChildren().forEach(coin => {
      if (coin.x < - coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      let minPlatformHeight = 600 * gameOptions.platformVerticalLimit[0];
      let maxPlatformHeight = 600 * gameOptions.platformVerticalLimit[1];
      let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, 800 + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }

  // FUNCTIONS
  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      let newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 50, "platform");
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

    // is there a coin over the platform?
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          let coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          let coin = this.physics.add.sprite(posX, posY - 96, "coin");
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play("rotate");
          this.coinGroup.add(coin);
        }
      }
    }
  }

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

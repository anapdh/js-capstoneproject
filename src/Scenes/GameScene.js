import 'phaser';

// global game options
let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [100, 300],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
  coinPercent: 25
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

    // ==================== PLAYER GROUP ====================
    // number of consecutive jumps made by the player
    this.playerJumps = 0;
    this.addPlatform(500, 250);

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, 300, "player");
    this.player.setGravityY(gameOptions.playerGravity);


    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('move');
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.coinGroup, function (coin) {
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

    // recycling coins
    this.coinGroup.getChildren().forEach(function (coin) {
      if (coin.x < - coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
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
        }
        else {
          let coin = this.physics.add.sprite(posX, posY - 96, "coin");
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play("rotate");
          this.coinGroup.add(coin);
        }
      }
    }
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


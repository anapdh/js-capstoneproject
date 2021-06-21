/* eslint-disable import/no-extraneous-dependencies */

import Phaser from 'phaser';
import scoreAPI from '../Objects/api';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.add.image(400, 300, 'bg');

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(0, 0, 800, 600);

    this.topTenText = this.add.text(400, 50, 'Last Scores', { fontSize: '32px', fill: '#fff' });
    this.topTenText.setOrigin(0.5, 0.5);

    scoreAPI.ScoreList().then((response) => {
      for (let i = 0; i < response.result.length && i < 8; i += 1) {
        this.add.text(250, i * 50 + 100, `${response.result[i].user} : ${response.result[i].score} points`, { fontSize: '25px', fill: '#fff' });
      }
    });

    // Title Score
    this.titleButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.titleButton, -2.2);

    this.titleText = this.add.text(0, 0, 'Menu', { fontSize: '24px', fill: '#fff' });
    this.centerButtonText(this.titleText, -2.2);

    this.titleButton.on('pointerdown', () => {
      this.scene.start('Title');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(400, 300 - offset * 100, 800, 600),
    );
  }

  centerButtonText(gameText, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameText,
      this.add.zone(400, 300 - offset * 100, 800, 600),
    );
  }
}

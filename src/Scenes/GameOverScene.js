import Phaser from 'phaser';
import ScoresScene from './ScoresScene';
import LocalStorage from '../Objects/LocalStorage';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {

    this.add.image(400, 300, 'bg');

    this.title = this.add.text(400, 120, 'Game Over', {
      font: '50px monospace',
      fill: '#000!',
    });
    this.title.setOrigin(0.5, 0.5);

    const score = LocalStorage.getScore();
    LocalStorage.clearStorage();

    this.score = this.add.text(400, 200, `Your score is: ${score}`, {
      font: '35px monospace',
      fill: '#888',
    });
    this.score.setOrigin(0.5, 0.5);

    // Buttons constructor
    const btn = (scene, positionX, positionY, btnDet, textSize) => {
      const btn = scene.add.text(positionX, positionY, btnDet, {
        fontSize: textSize,
      });
      btn.setOrigin(0.5, 0);
      btn.setInteractive();
      return btn;
    };

    // Play button
    this.gameButton = btn(this, 400, 400, 'Play Again', 35);
    this.gameButton.on('pointerdown', () => {
      ScoresScene.removeElements();
      this.scene.start('Game');
    });

    // Menu button
    this.gameButton = btn(this, 400, 500, 'Menu', 35);
    this.gameButton.on('pointerdown', () => {
      ScoresScene.removeElements();
      this.scene.start('Title');
    });

    ScoresScene.nameform();
    ScoresScene.submitButtonAction(score);
  }
}
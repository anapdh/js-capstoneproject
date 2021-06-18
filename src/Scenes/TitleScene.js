import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {

    this.add.image(400, 300, 'bg');
  
    this.title = this.add.text(400, 80, 'Running Bunny', {
      font: '50px monospace',
      fill: '#555!',
    });
    this.title.setOrigin(0.5, 0.5);

    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    // Leaderboard
    this.boardButton = new Button(this, config.width/2, config.height/2 + 200, 'blueButton1', 'blueButton2', 'Leaderboard', 'Leaderboard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
};

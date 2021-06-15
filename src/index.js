import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}
 
window.game = new Game();

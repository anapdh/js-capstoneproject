import Phaser from 'phaser';
import GameOverScene from '../src/Scenes/GameOverScene';

const scene = new GameOverScene();

test('GameOverScene is a function', () => {
  expect(typeof GameOverScene).toBe('function');
});

test('GameOverScene should be a subclass of Phaser.Scene', () => {
expect(GameOverScene).toBeSubclassOf(Phaser.Scene);
});

test('GameOverScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('GameOver');
});

test('GameOverScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
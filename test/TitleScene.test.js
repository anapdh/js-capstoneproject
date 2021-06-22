import Phaser from 'phaser';
import TitleScene from '../src/Scenes/TitleScene';

const scene = new TitleScene();

test('TitleScene is a function', () => {
  expect(typeof TitleScene).toBe('function');
});

test('TitleScene should be a subclass of Phaser.Scene', () => {
  expect(TitleScene).toBeSubclassOf(Phaser.Scene);
});

test('TitleScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('Title');
});

test('TitleScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
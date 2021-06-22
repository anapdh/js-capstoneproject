import Phaser from 'phaser';
import OptionsScene from '../src/Scenes/OptionsScene';

const scene = new OptionsScene();

test('OptionsScene is a function', () => {
  expect(typeof OptionsScene).toBe('function');
});

test('OptionsScene should be a subclass of Phaser.Scene', () => {
  expect(OptionsScene).toBeSubclassOf(Phaser.Scene);
});

test('OptionsScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('Options');
});

test('OptionsScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
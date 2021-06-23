import Phaser from 'phaser';
import BootScene from '../src/Scenes/BootScene';

const scene = new BootScene();

test('BootScene is a function', () => {
  expect(typeof BootScene).toBe('function');
});

test('BootScene should be a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});

test('BootScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('Boot');
});

test('BootScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
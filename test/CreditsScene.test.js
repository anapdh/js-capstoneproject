import Phaser from 'phaser';
import CreditsScene from '../src/Scenes/CreditsScene';

const scene = new CreditsScene();

test('CreditsScene is a function', () => {
  expect(typeof CreditsScene).toBe('function');
});

test('CreditsScene should be a subclass of Phaser.Scene', () => {
  expect(CreditsScene).toBeSubclassOf(Phaser.Scene);
});

test('CreditsScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('Credits');
});

test('CreditsScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
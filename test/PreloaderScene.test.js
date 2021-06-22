import Phaser from 'phaser';
import PreloaderScene from '../src/Scenes/PreloaderScene';

const scene = new PreloaderScene();

test('PreloaderScene is a function', () => {
  expect(typeof PreloaderScene).toBe('function');
});

test('PreloaderScene should be a subclass of Phaser.Scene', () => {
expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});

test('PreloaderScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('Preloader');
});

test('PreloaderScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
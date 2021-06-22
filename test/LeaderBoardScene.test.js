import Phaser from 'phaser';
import LeaderboardScene from '../src/Scenes/LeaderBoardScene';

const scene = new LeaderboardScene();

test('LeaderBoardScene is a function', () => {
  expect(typeof LeaderboardScene).toBe('function');
});

test('LeaderBoardScene should be a subclass of Phaser.Scene', () => {
expect(LeaderboardScene).toBeSubclassOf(Phaser.Scene);
});

test('LeaderboardScene has Scene Title key name', () => {
  expect(scene.sys.config).toBe('Leaderboard');
});

test('LeaderboardScene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
import ScoresScene from '../src/Scenes/ScoresScene';

test('ScoresScene is not undefined', () => {
  expect(ScoresScene).not.toBe(undefined);
});

test('ScoresScene is an object', () => {
  expect(ScoresScene).not.toBe('function');
});

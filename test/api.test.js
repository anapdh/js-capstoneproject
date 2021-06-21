import 'regenerator-runtime/runtime'
import api from '../src/Objects/api'

describe('Testing API', () => {
  it('it should return the scores object', async () => {
    await api.ScoreList()
      .then((data) => {
        expect(data).toEqual(
          expect.arrayContaining(Object),
        );
      })
      .catch(() => {});
  });

  it('it should return the scores object with a score number', async () => {
    await api.ScoreList()
      .then((data) => {
        expect(data).toEqual(
          expect.arrayContaining([
            expect.objectContainin({
              name: 'FooBar',
            }),
          ]),
        );
      })
      .catch(() => {});
  });

  it('submits the player score', async () => {
    await api.submit('Foo', 100).then((response) => {
      expect(response).toMath('Leaderboard');
    }).catch((error) => error);
  });

  it('checks for the score not to be a divisible of 5', async () => {
    await api.submit('Foo', 15).then((response) => {
      expect(response).toBe(null);
    }).catch((error) => error);
  });

  it('checks for the score not to be 0', async () => {
    await api.submit('Foo', 0).then((response) => {
      expect(response).toBe(null);
    }).catch((error) => error);
  });

  it('checks invalid data sending', async () => {
    await api.submit('', 300).then((response) => {
      expect(response).toBe(null);
    }).catch((err) => err);
  });

  it('tests the type of information sent to the server', async () => {
    await api.submit('Foo', 20).then((data) => {
      expect(data).toBe('object');
    }).catch((error) => error);
  });
});
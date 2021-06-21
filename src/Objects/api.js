const api = (() => {
  const key = 'MYCAPSTONE1123456789';

  const ScoreList = async () => {
    try {
      const scores = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
        {
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      return scores.json();
    } catch (error) {
      return error.json();
    }
  };

  const submit = async (user, score) => {
    try {
      const result = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
            score: Number(score),
          }),
        },
      );

      return result.json();
    } catch (error) {
      return error.json();
    }
  };

  return { submit, ScoreList };
})();

export default api;
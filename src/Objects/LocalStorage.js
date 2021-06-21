const LocalStorage = (() => {
  const saveScore = (score) => {
    localStorage.setItem('score', JSON.stringify(score));
  };

  const getScore = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    if (!score) {
      return 0;
    }
    return score;
  };

  const clearScore = () => {
    localStorage.clear();
  };

  return {
    saveScore,
    getScore,
    clearScore,
  };
})();

export default LocalStorage;

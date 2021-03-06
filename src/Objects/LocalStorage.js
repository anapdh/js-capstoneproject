const LocalStorage = (() => {
  const saveScore = (score) => {
    localStorage.setItem('score', JSON.stringify(score));
  };
  const getScore = () => {
    const score = JSON.parse(localStorage.getItem('score'));
    if (!score) {
      return `${0}. Try again :)`;
    }
    return score;
  };
  const clearStorage = () => {
    localStorage.clear();
  };
  return { saveScore, getScore, clearStorage };
})();

export default LocalStorage;
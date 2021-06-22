import scoreAPI from '../Objects/api';

const ScoresScene = (() => {
  const nameform = () => {
    const form = document.createElement('div');
    const p = document.createElement('p');
    form.setAttribute('id', 'form');
    form.className = 'form-group text-center';
    form.style.position = 'absolute';
    form.style.top = '48%';
    form.style.left = '42%';
    form.style.right = '42%';
    form.innerHTML = `
      <input class="form-control" type="search" id="input" placeholder="Enter your name" aria-label="Search" required/></br>
      <button class="form-control btn btn-secondary btn-block" type="submit" id="submit"> Submit Score</button>
    `;
    form.appendChild(p);
    const body = document.body.appendChild(form);
    return body;
  };

  const submitButtonAction = (score) => {
    const input = document.querySelector('#input');
    const form = document.querySelector('#form');
    const button = document.querySelector('#submit');
    const p = document.querySelector('p');
    setTimeout(() => {
      button.onclick = () => {
        if (input.value !== '') {
          form.innerHTML = '<h3 id="submitting">Posting score... </h3>';
          scoreAPI.submit(input.value, score).then((response) => {
            form.innerHTML = `<h3 id="response">${response.result} </h3>`;
          });
        } else {
          p.innerHTML = 'Enter a valid name';
        }
      };
    }, 1000);
  };

  const removeElements = () => {
    const form = document.querySelector('#form');
    form.parentNode.removeChild(form);
  };

  return {
    nameform,
    submitButtonAction,
    removeElements,
  };
})();

export default ScoresScene;
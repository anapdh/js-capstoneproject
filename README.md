![](https://img.shields.io/badge/Microverse-blueviolet) ![](https://img.shields.io/badge/JavaScript-yellow) ![](https://img.shields.io/badge/Phaser3-pink)


# RUNNING BUNNY

> A platformer game using Phaser3 library and Vanilla JS. This project features the knowledge of Webpack, ES6, JS Modules, Async code, DOM, JSON and Jest tests.

This little bunny got lost in the big city and now he has to run for his life! Help him to avoid the city buildings' holes and collecting stars for gaining strength.

## Screenshots

![screenshot](/assets/screenshotMenu.png)
---
![screenshot](/assets/screenshot.png)
---
![screenshot](/assets/screenshotGameOver.png)
---

## Game Design

- This game is an Endless Runner [Platform Game](https://en.wikipedia.org/wiki/Platform_game).
- The platforms appear infinitely until the game ends and the game character (the bunny) has to jump from platform to platform;
- If the bunny falls from the platform, the game is over;
- Your progress (score) is measured by the number of stars you collect. Each star counts 10 points.
- To jump, you have to simply click on the screen with the left mouse button, or use whether the key up arrow or space in your keyboard. Clicking twice, you'll jump 2x (limit of jumps at once);
- If you have a score above 0 points, you can save your score to the leaderboard by submitting your name in the Game Over screen;
- You can check the leaderboard by clicking on the "Leaderboard" on the Main Menu or Gave Over Scene.

## Built With

- Html & JavaScript;
- Phaser3;
- Webpack;
- Bootstrap;
- Git and GitHub.

## Live Demo
[Play the game!](https://running-bunny-2021.netlify.app)

## How to Play

1. Go to the [Live Demo Link](https://running-bunny-2021.netlify.app) to play online;
  - If you'd like to download the game to run on your local machine, follow the steps "Running the game in your Local Machine" below;
2. Click on the "Play" button to start the game;
  - Use your mouse clicking (inside the game screen) or the keys (up arrow or spacebar) to jump;
  - Avoid falling from the building's platforms and try to collect as many coins as you can;
  - Each coin collected gives you 10 points. You can look at your score at the top-left corner of the screen;
  - If you fall from a building platform, you will see the "Game Over" screen with your final score;
3. When the game is over;
  - If your punctuation is above 0, feel free to save your score and submit it to the leaderboard;
  - If you want to play again, click on the "Play Again" button to restart the game from score 0, or;
  - Click on the "Leaderboard" button to see the current top eight scores;
  - Click on the "Menu" button to go to the Main Menu scene;
4. Don't forget to have fun while playing the game. :)

## Running the game in your Local Machine
### Prerequisites

- Node.js;
- npm;
- Code Editor.

### Setup

To get a local copy and run this repository there are 2 possible ways:

### - If you are not used to the terminal usage (non-technical user):

1. on the very beginning of this page, in the up-left corner, you will see a green button "CODE", click there;

2. After clicking, it will open menu options. Select to download the zip document and save it whenever you'd like, as shown in the image below:
>![tutorial1](/assets/tutorial1.png)

3. Unzip the file (you can unzip it by clicking with the right mouse option on the file, in "Extract All" and selecting a destiny folder);

4. Open your Code editor > Select the option "File" in the top-left corner > And then "Open Folder" > Select the same folder you saved the extracted files as described in item 3;

5. Now you have this whole project to run on your computer!
- Install the necessary configurations to run the project: type `npm install`;
- Run the application by typing ```npm start```, launch your local browser and type the URL: http://localhost:8080 in the browser;

6. Get back to the topic "How to Play" to read the game instructions.

### - If you are used the terminal usage (technical user):

1. Open your terminal and go to the directory where you want to clone the repository;

2. Download/clone this repository [GitHub Repository](https://github.com/anapdh/js-capstoneproject) on your computer: type `git clone https://github.com/anapdh/js-capstoneproject`;
(In case you need more help, check out this link: [Cloning a GitHub Repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository);

3. Still in your terminal, use the command `cd` to go to the place where you saved/cloned the repository. For example: _Desktop/User/js-capstoneproject/_. You may use the command `ls` to see the files and repositories existent in your current location;

4. Install the necessary configurations to run the project: type `npm install`;

5. Now your environment is ready to run the project! Run the application by typing ```npm start```, launch your local browser and type the URL: http://localhost:8080;

6. Get back to the topic "How to Play" to read the game instructions.

## Run tests

To run all the tests, type on your terminal the command `jest` or `npm test`.

PS: you need to have jest installed in your computer. If you're having any errors, please, type ```npm install --save-dev jest```, or follow the [Jest Documentation to install it globally](https://archive.jestjs.io/docs/en/22.x/getting-started.html#running-from-command-line).

## Authors

👩🏼‍💻 **Ana Paula Hübner**

- GitHub: [@anapdh](https://github.com/anapdh)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/anapdh)
- Twitter: [@dev_anahub](https://twitter.com/dev_anahub)

## Acknowledgment
A special thanks to:

- Tutorial: [Emanuelle Feronato](https://www.emanueleferonato.com/tag/endless-runner/);
- Bunny Sprite: [OpenGameArt](https://opengameart.org/content/bunny-sprite);
- Background: [ansimuz.com](https://ansimuz.com/site/);
- Coins: [kenney.nl](https://www.kenney.nl/assets);
- Helping Friends ❤️: [João Paulo](https://github.com/jpdf00) & [Jhonatan Sarrazola](https://github.com/jssarrazolaa).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/anapdh/js-capstoneproject/issues).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](https://github.com/anapdh/js-capstoneproject/blob/feature/running-bunny/LICENSE.md) licensed.

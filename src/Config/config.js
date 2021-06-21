/* eslint-disable import/no-extraneous-dependencies */

import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  autoCenter: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
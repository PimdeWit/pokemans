import * as PIXI from 'pixi.js';

import store from './store';
import Pokemans from './core/core.js';

const getState = () => {
  let state = store.getState();

  console.log(state);
};

window.onload = function() {
  PIXI.utils.skipHello();
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  document.body.style.margin = 0;
  document.body.style.minHeight = '100vh';
  let app = new Pokemans(document.body);

  getState();
  store.subscribe(getState);
};

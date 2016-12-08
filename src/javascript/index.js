import * as PIXI from 'pixi.js';
PIXI.utils.skipHello();
PIXI.settings.SCALE_MODE = PIXI.settings.SCALE_MODE.NEAREST;
import store from './store';
import Pokemans from './core/core.js';

const getState = () => {
  let state = store.getState();

  console.log(state);
};

window.onload = function() {
  document.body.style.margin = 0;
  document.body.style.minHeight = '100vh';
  let app = new Pokemans(document.body);
  app.addEventListeners();

  getState();
  store.subscribe(getState);
};

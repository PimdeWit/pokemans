import {createStore} from 'redux';
import reducers from './reducers';
import Pokemans from './core/core.js';
import {toggleDrawer} from './actionCreators';

let store = createStore(reducers);

let mytoggleDrawer = () => toggleDrawer.apply(undefined, [store].concat(arguments));

const getState = () => {
  let state = store.getState();
  console.log(state);
};


window.onload = function() {
  let app = new Pokemans(document.body);
  app.addEventListeners();

  getState();
  store.subscribe(getState);
};

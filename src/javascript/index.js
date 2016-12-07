import {createStore} from 'redux';
import reducers from './reducers';
import {toggleDrawer} from './actionCreators';

let store = createStore(reducers);

let mytoggleDrawer = () => toggleDrawer.apply(undefined, [store].concat(arguments));

const render = () => {
  let state = store.getState();
  let h1 = document.querySelector('h1');

  h1 = h1 || document.body.appendChild(document.createElement('h1'));

  h1.innerHTML = state.drawer.open ? 'open' : 'closed';
};

setInterval(function() {
  mytoggleDrawer();
}, 1500);

render();
store.subscribe(render);

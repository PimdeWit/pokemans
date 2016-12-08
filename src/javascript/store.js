import * as PIXI from 'pixi.js';

import {createStore} from 'redux';
import reducers from './reducers';
import * as actions from './actionCreators';
import {toggleDrawer} from './actionCreators';

let store = createStore(reducers);

export default store;
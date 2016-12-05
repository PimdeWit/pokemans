import {createStore} from 'redux'

import Test from './test.js';


const store = createStore(reducer);

console.log('hey');
console.log(store, reducer);

Test();
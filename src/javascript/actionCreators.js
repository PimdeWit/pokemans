import {TOGGLE_DRAWER} from './actions';

const toggleDrawer = store => {
  store.dispatch({
    type: TOGGLE_DRAWER
  });
};

module.exports = {toggleDrawer};

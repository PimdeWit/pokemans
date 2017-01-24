import {TOGGLE_DRAWER} from '../actions';

const initialState = {
  open: false
};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        open: !state.open
      });
    default:
      return state;
  }
};

export default drawerReducer;
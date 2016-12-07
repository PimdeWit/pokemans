import {TOGGLE_DRAWER} from '../actions';

const initialState = {
  tileSize: 16,
};

const mapReducer = (state = initialState, action) => {
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
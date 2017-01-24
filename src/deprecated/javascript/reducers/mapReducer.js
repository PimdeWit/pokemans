import {MAP_LOADED} from '../actions';

const initialState = {
  tileSize: 16,
  mapLoaded: false
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAP_LOADED:
      return Object.assign({}, state, {
        mapLoaded: true
      });
    default:
      return state;
  }
};

export default drawerReducer;
import {combineReducers} from 'redux';
import drawer from './drawerReducer';

const reducers = combineReducers({
  drawer,
});

export default reducers;

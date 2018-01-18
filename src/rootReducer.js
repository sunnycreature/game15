import { combineReducers } from 'redux';
import { gameReducer } from './reducer';

export const rootReducer = combineReducers({gameReducer});
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {counterReducer} from './service/counter/reducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  combineReducers({counter: counterReducer}), applyMiddleware(logger,thunk));

export default store;
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import podcastsReducer from './podcasts/podcasts.reducer';

export default function createPonderStore() {
  return createStore(
    combineReducers(podcastsReducer),

  );
}

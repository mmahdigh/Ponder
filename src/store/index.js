import { configureStore } from '@reduxjs/toolkit';
import podcastsReducer from './podcasts/podcasts.reducer';

export default function createPonderStore() {
  return configureStore({
    reducer: {
      podcasts: podcastsReducer,
    },
    middleware(getDefaultMiddleware) {
      return {
        thunk: {},
      };
    },
  });
}

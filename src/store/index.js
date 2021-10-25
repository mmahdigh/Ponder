import { configureStore } from '@reduxjs/toolkit';
import podcastsSlice from './podcasts';

export default function createStore() {
  return configureStore({
    reducer: {
      podcasts: podcastsSlice,
    },
  });
}

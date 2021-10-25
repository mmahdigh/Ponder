import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as rssClient from '../client/rss';
import * as arweaveClient from '../client/arweave';

export const getPodcasts = createAsyncThunk('@ponder/podcasts/get', async url => Promise.all([
  rssClient.searchPodcastFeed(url),
  arweaveClient.searchPodcastFeed(url),
])
  .then(([rss, arweave]) => ({ rss, arweave })));

const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState: {
    isLoading: false,
    rss: [],
    arweave: [],
  },
  extraReducers(builder) {
    builder
      .addCase(getPodcasts.pending, state => {
        Object.assign(state, { isLoading: true });
      })
      .addCase(getPodcasts.fulfilled, (state, action) => {
        Object.assign(state, {
          isLoading: false,
          ...action.payload,
        });
      });
  },
});

export default podcastsSlice;

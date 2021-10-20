import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const GET_PODCASTS = '@ponder/podcasts/get-podcasts';
const CREATE_PODCAST = '@ponder/podcasts/create-podcast';

const adapter = createEntityAdapter();

export default createSlice({
  name: 'podcasts',
  initialState: adapter.getInitialState({
    items: [],
  }),
  reducers: {},
});

'use strict';

const seed = require('.');
const seeds = require('./seeds.json');

seed({
  ...seeds,
  podcasts: seeds.podcasts.map(podcast => ({
    ...podcast,
    contents: {
      ...podcast.contents,
      episodes: podcast.contents.episodes.slice(0, -10),
    },
  })),
});

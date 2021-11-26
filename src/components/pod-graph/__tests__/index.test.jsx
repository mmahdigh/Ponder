import React from 'react';
import { render } from 'util';
import PodGraph from '..';

const BASE_SUBSCRIPTIONS = [
  {
    description: 'Conan does things',
    imageUrl: 'https://image.simplecastcdn.com/images/5b7d8c77-15ba-4eff-a999-2e725db21db5/2ca29cb6-c010-4780-a9ba-7e5e1729f565/3000x3000/conaf-cover.jpg?aid=rss_feed',
    imageTitle: 'Conan O’Brien Needs A Friend',
    language: 'en-us',
    categories: ['comedy'],
    keywords: [],
    subscribeUrl: 'https://feeds.simplecast.com/dHoohVNH',
    title: 'Conan O’Brien Needs A Friend',
    firstPublishedAt: new Date('2021-11-25T05:00:00.000Z'),
    lastPublishedAt: new Date('2021-11-22T05:00:00.000Z'),
    episodes: [
      {
        title: 'Trapped and Neutered',
        url: 'https://chtbl.com/track/9E9755/stitcher.simplecastaudio.com/c945bd13-c7f3-4f22-95b5-4bf98e12b21f/episodes/cde3d4ba-0c9c-4b25-b53c-289d116272a4/audio/128/default.mp3?aid=rss_feed&awCollectionId=c945bd13-c7f3-4f22-95b5-4bf98e12b21f&awEpisodeId=cde3d4ba-0c9c-4b25-b53c-289d116272a4&feed=dHoohVNH',
        publishedAt: new Date('2021-11-25T05:00:00.000Z'),
        imageUrl: 'https://image.simplecastcdn.com/images/5b7d8c77-15ba-4eff-a999-2e725db21db5/2ca29cb6-c010-4780-a9ba-7e5e1729f565/3000x3000/conaf-cover.jpg?aid=rss_feed',
        categories: [],
        keywords: [],
      },
      {
        title: 'John Lithgow',
        url: 'https://chtbl.com/track/9E9755/stitcher.simplecastaudio.com/c945bd13-c7f3-4f22-95b5-4bf98e12b21f/episodes/818d3ec8-13cb-49a1-a762-71689dc86754/audio/128/default.mp3?aid=rss_feed&awCollectionId=c945bd13-c7f3-4f22-95b5-4bf98e12b21f&awEpisodeId=818d3ec8-13cb-49a1-a762-71689dc86754&feed=dHoohVNH',
        publishedAt: new Date('2021-11-22T05:00:00.000Z'),
        imageUrl: 'https://image.simplecastcdn.com/images/5b7d8c77-15ba-4eff-a999-2e725db21db5/2ca29cb6-c010-4780-a9ba-7e5e1729f565/3000x3000/conaf-cover.jpg?aid=rss_feed',
        categories: [],
        keywords: [],
      },
    ],
  },
  {
    description: 'Jimmy Dore is outrageous and outraged',
    imageUrl: 'https://ssl-static.libsyn.com/p/assets/a/7/5/6/a756a3fe5cfb3d10/JDPodLogo.jpg',
    imageTitle: 'The Jimmy Dore Show',
    language: 'en',
    categories: ['arts', 'comedy'],
    keywords: [
      'jimmy',
      'debate',
      'dore',
      'humor',
      'politics',
      'sketches',
    ],
    subscribeUrl: 'https://thejimmydoreshow.libsyn.com/rss',
    title: 'The Jimmy Dore Show',
    firstPublishedAt: new Date('2021-11-24T17:21:22.000Z'),
    lastPublishedAt: new Date('2021-11-18T07:36:32.000Z'),
    episodes: [
      {
        title: 'Bill Gates Caught Buying Positive News Coverage!',
        url: 'https://traffic.libsyn.com/secure/thejimmydoreshow/TJDS_20211124_Podcast.mp3?dest-id=19460',
        publishedAt: new Date('2021-11-24T17:21:22.000Z'),
        imageUrl: 'https://ssl-static.libsyn.com/p/assets/a/7/5/6/a756a3fe5cfb3d10/JDPodLogo.jpg',
        categories: [],
        keywords: [],
      },
      {
        title: 'Pelosi Confronted!',
        url: 'https://traffic.libsyn.com/secure/thejimmydoreshow/TJDS_20211117_Podcast.mp3?dest-id=19460',
        publishedAt: new Date('2021-11-18T07:36:32.000Z'),
        imageUrl: 'https://ssl-static.libsyn.com/p/assets/a/7/5/6/a756a3fe5cfb3d10/JDPodLogo.jpg',
        categories: [],
        keywords: [],
      },
    ],
  },
];

test('Initializes Cytoscape and attaches reference onto window', () => {
  render(<PodGraph subscriptions={BASE_SUBSCRIPTIONS} />);
});

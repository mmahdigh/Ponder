export default function getCustomStuff() {
  return FAKE_DATA;
}

const FAKE_DATA = {
  podcasts: [{
    nodeID: '6',
    'rss2-feed': '  ',
    title: 'The Jimmy Dore Show',
    description: '“ Jimmy Dore is outrageous and outraged, bothersome and bothered, a crucial, profane, passionate voice for progressives and freethinkers in 21st century America.” -Patton Oswalt',
    categories: ['111', 'Arts', 'awesome', 'Comedy', 'News'],
    keywords: ['debate', 'dore', 'humor', 'jimmy', 'politics', 'sketches'],
    bgImg: 'https://megaphone.imgix.net/podcasts/34814bf8-e860-11e8-8bb2-6f3e1a98c859/image/uploads_2F1553887433220-tm6mswb02ve-81b991f0edef1e2d49524f20aaa20a8f_2FTDS_EARS_EDITION_COVER_ART_2019.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
  },
  {
    nodeID: '7',
    'rss2-feed': 'https://audioboom.com/channels/4954758.rss',
    title: 'Duncan Trussell Family Hour',
    description: 'A weekly salon-style supershow, where comedian Duncan Trussell and guests explore the outer reaches of the multiverse. And on April 20th 2020, the Duncan Trussell Family Hour podcast will be coming to Netflix in the form of &quot;The Midnight Gospel&quot;, created by Duncan Trussell and Pendleton Ward. The adult animated Netflix series is set in a fantastical universe and will use interview clips from the podcast',
    categories: ['6969', 'Society', 'Culture', 'Comedy', 'Religion'],
    keywords: ['comedy', 'dore', 'humor', 'Trussel'],
    bgImg: 'https://megaphone.imgix.net/podcasts/34814bf8-e860-11e8-8bb2-6f3e1a98c859/image/uploads_2F1553887433220-tm6mswb02ve-81b991f0edef1e2d49524f20aaa20a8f_2FTDS_EARS_EDITION_COVER_ART_2019.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
  },
  {
    nodeID: '8',
    'rss2-feed': 'https://feeds.megaphone.fm/the-daily-show',
    title: 'The Daily Show With Trevor Noah: Ears Edition',
    description: 'Listen to highlights and extended interviews in the Ears Edition  of The Daily Show with Trevor Noah. From Comedy Central’s Podcast Network.',
    categories: ['News', 'Daily News', 'Comedy', 'News'],
    keywords: ['news', 'daily news', 'comedy', 'trevoh noah'],
    bgImg: 'https://megaphone.imgix.net/podcasts/34814bf8-e860-11e8-8bb2-6f3e1a98c859/image/uploads_2F1553887433220-tm6mswb02ve-81b991f0edef1e2d49524f20aaa20a8f_2FTDS_EARS_EDITION_COVER_ART_2019.jpg?ixlib=rails-2.1.2&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
  },
  ],
  episodes: [
    {
      6: [
        {
          id: '6-10001',
          'date-published': 'Thu, 12 Dec 2019 06:52:17 +0000',
          title: "Nancy Pelosi's Impeachment Hypocrisy!",
          description: '<p>Why Nancy Pelosi did not impeach Bush!</p> <p>FBI lied to get surveillance warrants!</p> <p>Phone calls from Al Pacino!  Chuck Schumer!  Rick Perry! Vladimir Putin!</p> <p>Featuring Stef Zamorano, Ron Placone, and Mike MacRae!</p>',
          categories: ['Politics'],
          keywords: [],
          url: 'https://traffic.libsyn.com/secure/thejimmydoreshow/TJDS_20191211_Podcast.mp3',
          length: '60738249',
        },
        {
          id: '6-10002',
          'date-published': 'Thu, 19 Dec 2019 08:42:23 +0000',
          title: 'FBI Director Exposed!',
          description: '<p>Bernie Sanders "un-endorses" Cenk Uygur!</p> <p>James Comey\'s lies exposed in interview!</p> <p>CNN denies public opinion of impeachment!</p> <p>Phone calls from Jake Tapper, George Clooney, Barrack Obama!</p> <p>Featuring Stef Zamorano, Ron Placone, and Mike MacRae!</p>',
          categories: [],
          keywords: ['FBI'],
          url: 'https://traffic.libsyn.com/secure/thejimmydoreshow/TJDS_20191219_Podcast.mp3',
          length: '63909786',
        },
        {
          id: '6-10003',
          'date-published': 'Tue, 24 Dec 2019 05:28:12 +0000',
          title: 'Origin of Christmas!',
          description: '<p>The origins of Christmas!</p> <p>Dems give Trump everything he wants!</p> <p>Pete Buttigieg calls voters against corruption "purists"!</p> <p>Featuring Stef Zamorano, Ron Placone, Katie Halper, and Mike MacRae!</p> <p>Phone calls from Joe Biden, Barrack Obama, and Christmas messages!</p>',
          categories: [],
          keywords: ['Christmas'],
          url: 'https://traffic.libsyn.com/secure/thejimmydoreshow/TJDS_20191224_Podcast.mp3',
          length: '56229639',
        },
      ],
    },
    {
      7: [
        {
          id: '7-10001',
          'date-published': 'Thu, 12 Dec 2019 06:52:17 +0000',
          title: '460: Rob Schrab',
          description: '<p> A very cool description for this podcast</p>',
          categories: ['Politics'],
          keywords: [],
          url: 'https://audioboom.com/posts/7935822.mp3?modified=1630721083&amp;source=rss&amp;stitched=1',
          length: '4922',
        },
        {
          id: '7-10002',
          'date-published': 'Fri, 27 Aug 2021 03:44:45 +0000',
          title: '458: Matt Dwyer',
          description: '<p> A very cool description for this podcast</p>',
          categories: ['Politics'],
          keywords: [],
          url: 'https://audioboom.com/posts/7931314.mp3?modified=1630036855&amp;source=rss&amp;stitched=1',
          length: '6494',
        },
        {
          id: '7-10003',
          'date-published': 'Fri, 13 Aug 2021 05:05:38 +0000',
          title: '456: David Nichtern',
          description: "<div><strong>David Nichtern</strong>, Duncan's friend and meditation teacher, re-joins the DTFH for a talk about enlightenment!</div>",
          categories: ['Politics'],
          keywords: [],
          url: 'https://audioboom.com/posts/7923556.mp3?modified=1628831255&amp;source=rss&amp;stitched=1',
          length: '6494',
        },
      ],
    },
    {
      8: [
        {
          id: '8-10001',
          'date-published': 'Tue, 07 Sep 2021 03:59:00 -0000',
          title: 'Eye on Texas: Ted Cruz, Immigration & Blaming AOC',
          description: '<p>The Daily Show chronicles the life of Sen. Ted Cruz, conservatives blame liberals for a devastating winter storm, and District Attorney Mark Gonzalez fights for change in Nueces County.</p>',
          categories: ['Politics'],
          keywords: [],
          url: 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/E8GEF6/traffic.megaphone.fm/HSW6317531046.mp3?updated=1630708712',
          length: '2682',
        },
        {
          id: '8-10002',
          'date-published': 'Mon, 06 Sep 2021 03:59:00 -0000',
          title: "Trevor's Many Accents",
          description: '<p>Trevor explains how the people in his life inspired him to mimic a variety of accents, what went wrong when he learned to speak German and the downside of his limited Spanish vocabulary.</p>',
          categories: ['Politics'],
          keywords: [],
          url: 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/E8GEF6/traffic.megaphone.fm/HSW8304630691.mp3?updated=1630708541',
          length: '1776',
        },
        {
          id: '8-10003',
          'date-published': 'Fri, 03 Sep 2021 03:59:00 -0000',
          title: 'Eye on Australia: Animals, Ronny Chieng & Mandatory Voting',
          description: "<p>In Australia, a massive cow becomes a viral sensation, Ronny Chieng explores the country's mandatory voting policy, and high school students take on greedy pharmaceutical heads.</p>",
          categories: ['Politics'],
          keywords: [],
          url: 'https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chtbl.com/track/E8GEF6/traffic.megaphone.fm/HSW8304630691.mp3?updated=1630708541',
          length: '1709',
        },
      ],
    },
  ],
  subscriptions: [
    {
      name: 'user1',
      pods: [
        { podcastID: '6' },
        { podcastID: '7' },
      ],
    },
    {
      name: 'user2',
      pods: [
        { podcastID: '6' },
        { podcastID: '8' },
      ],
    },
    {
      name: 'user3',
      pods: [
        { podcastID: '8' },
        { podcastID: '7' },
      ],
    },
  ],
  edges: [
    {
      edgeID: 'edge1',
      fromID: '6',
      toID: '7',
    },

    {
      edgeID: 'edge2',
      fromID: '6',
      toID: '8',
    },
  ],
};

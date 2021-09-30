import ItunesSearch from 'node-itunes-search'

class ItunesFormatter {
  static INIT_METADATA = {
    episodes: {},
    podcasts: {},
    subscriptions: {
      user1: ['1', '2'],
      user2: ['1', '3']
    }
  }

  constructor() {
    if (!window.metadata)
      window.metadata = ItunesFormatter.INIT_METADATA

  }

  async parseFeed(url) {
    return await this.parser.parseURL(url, function(err, feed) {
      if (err) throw err;
    })
  }

  // async feedToObj(url) {
  //   console.log(`url: ${url}`)
  //   if (!url) return

  //   let feed = await this.parseFeed(url)
  //   window.feed = feed

  //   let podcast_id = RSSParser.getPodcastID(url)
  //   console.log(`New podcast id: ${podcast_id}`)

  //   window.metadata.podcasts[podcast_id] = RSSParser.podcastMetadata(feed)
  //   window.metadata.episodes[podcast_id] = RSSParser.episodesMetadata(feed, podcast_id)
  // }

  // static podcastMetadata(feed) {
  //   let result = {}

  //   if (feed.description)
  //     result['description'] = feed.description
  //   else if (feed.itunes.summary)
  //     result['description'] = feed.itunes.summary

  //   result['rss2-feed'] = feed.feedUrl
  //   result['title'] = feed.title
  //   result['categories'] = RSSParser.mergeArraysUniq(feed.itunes.categories, feed.categories)
  //   result['keywords'] = RSSParser.mergeArraysUniq(feed.itunes.keywords, feed.keywords)

  //   return result
  // }

  // static episodesMetadata(feed, podcast_id) {
  //   let result = []
  //   let index = 0

  //   feed.items.reverse().forEach(item => {
  //     index++
  //     let episode = {}
  //     episode['id'] = `${podcast_id}-${10000 + index}`
  //     episode['date-published'] = item.isoDate
  //     episode['title'] = item.title
  //     episode['url'] = item.link
  //     episode['duration'] = item.itunes.duration
  //     episode['categories'] = RSSParser.mergeArraysUniq(item.itunes.categories, item.categories)
  //     episode['keywords'] = RSSParser.mergeArraysUniq(item.itunes.keywords, item.keywords)
  //     result.push(episode)
  //   })

  //   return result
  // }

  /* If podcast matching feedUrl resides in window.metadata, returns its id;
   * else returns the first free id starting with 1
   * TODO: fix podcast id race conditions with Arweave (Smartweave?) */
  static getPodcastID(feedUrl) {
    let podcasts = Object.entries(window.metadata.podcasts)
    for (const [id, podcast] of podcasts) {
      if (podcast['rss2-feed'] === feedUrl)
        return id
    }
    if (podcasts.length)
      return parseInt(podcasts.slice(-1)[0][0]) + 1
    else
      return 1
  }

  /* Returns the two arrays concatenated and stripped of empty and duplicate values */
  static mergeArraysUniq(array1, array2) {
    return [...new Set([...[array1], ...[array2]].flat())].filter(x => x)
  }
}

export default ItunesFormatter

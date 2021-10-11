import Parser from 'rss-parser'

class MetadataFormatter {
  static INIT_METADATA = {
    episodes: {},
    podcasts: {},
    subscriptions: {
      user1: ['1', '2'],
      user2: ['1', '3']
    }
  }

  constructor() {
    if (!window.rssmetadata)
      window.rssmetadata = MetadataFormatter.INIT_METADATA

    this.parser = new Parser()
  }

  async formatMetadataFromFeedURL(url) {
    console.log(`url: ${url}`)
    if (!url) return

    let feed = await this.parser.parseURL(url) // TODO err handling
    MetadataFormatter.formatMetadataFromFeed(url, feed)
  }

  static formatMetadataFromFeed(url, feed) {
    console.log('feed:', feed)

    // TODO: hash podcast id's
    let podcast_id = url
    console.log(`Parsing RSS for podcast id: ${podcast_id}`)

    window.rssmetadata.podcasts[podcast_id] = MetadataFormatter.podcastMetadata(feed)
    window.rssmetadata.episodes[podcast_id] = MetadataFormatter.episodesMetadata(feed, podcast_id)
  }

  static podcastMetadata(feed) {
    let result = {}
    let itunes = feed.itunes || {}

    if (feed.description)
      result['description'] = feed.description
    else if (itunes.summary)
      result['description'] = itunes.summary

    result['rss2_feed'] = feed.feedUrl
    result['title'] = feed.title
    result['image'] = feed.image.url
    result['categories'] = MetadataFormatter.mergeArraysUniq(itunes.categories, feed.categories)
    result['keywords'] = MetadataFormatter.mergeArraysUniq(itunes.keywords, feed.keywords)

    return result
  }

  static episodesMetadata(feed, podcast_id) {
    let episodes = {}
    let index = 0
    let [latest_episode_id, latest_episode] = MetadataFormatter.latestPostedEpisode(podcast_id)
    console.log(`latest_episode_id=${latest_episode_id}`, latest_episode)

    feed.items.reverse().forEach(item => {
      index++
      let itunes = item.itunes || {}
      let episode_metadata = {}

      if (latest_episode) {
        // Sync index with latest episode index residing on Arweave
        if (item.isoDate === latest_episode.date_published && item.title === latest_episode.title) {
          console.log('matched')
          // Found match => metadata of subsequent episodes will be added
          latest_episode = null
          index = parseInt(latest_episode_id) - 10000
        }
      }
      else {
        let episode_id = `${10000 + index}`

        episode_metadata['date_published'] = item.isoDate || ''
        episode_metadata['title'] = item.title || ''
        episode_metadata['image'] = itunes.image || ''
        episode_metadata['description'] = item.content || ''
        episode_metadata['short_description'] = itunes.subtitle || item.contentSnippet || ''
        episode_metadata['url'] = item.link || ''
        episode_metadata['duration'] = itunes.duration || ''
        episode_metadata['categories'] =
            MetadataFormatter.mergeArraysUniq(itunes.categories, item.categories)
        episode_metadata['keywords'] =
            MetadataFormatter.mergeArraysUniq(itunes.keywords, item.keywords)

        episodes[episode_id] = episode_metadata
      }
    })

    return episodes
  }

  // /* If podcast matching feed_url resides in window.armetadata, returns its id;
  //  * else returns the first free id starting with 1
  //  * TODO: fix podcast id race conditions wrt Arweave */
  // static getPodcastID(feed_url) {
  //   // Look for the podcast id in the currently loaded metadata
  //   let podcasts = Object.entries(window.armetadata.podcasts)
  //   for (const [id, podcast] of podcasts) {
  //     if (podcast['rss2_feed'] === feed_url)
  //       return id
  //   }

  //   // Podcast not present in currently loaded metadata. TODO: generate new hash key
  //   // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
  //   if (podcasts.length)
  //     return parseInt(podcasts.slice(-1)[0][0]) + 1
  //   else
  //     return 1
  // }

  /* @return [<String, Object>]
   *   The id and metadata Object of the latest episode residing on Arweave */
  static latestPostedEpisode(podcast_id) {
    let latest_episode = Object.entries(window.armetadata.episodes[podcast_id] || {}).slice(-1)[0]
    if (latest_episode)
      return latest_episode

    return ['', null]
  }

  /* Returns the two arrays concatenated and stripped of empty and duplicate values */
  static mergeArraysUniq(array1, array2) {
    return [...new Set([...[array1], ...[array2]].flat())].filter(x => x)
  }
}

export default MetadataFormatter

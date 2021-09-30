import Arweave from 'arweave';
import MetadataFormatter from '../formatting/MetadataFormatter.js'

class ArweaveApi {
  static INIT_METADATA = {
    episodes: {},
    podcasts: {},
    subscriptions: {
      user1: ['1', '2'],
      user2: ['1', '3']
    }
  }

  static TESTKEY = {
    "kty": "RSA",
    "e": "AQAB",
    "n": "zhTx5Kr9VNQrXGarf0EXySfbSePBbIQuSOpb07s3pM3q8HKCx-bbd_py8t-JxgwnKAmpGKt6UhOP0FeobGITCwr_O7ATFPrFgTbM-xLYG0JOzxUlPScyqdJ8rFRcSSpevfUyJ6UVTpA3LDQHEzf7kebjfMPeYwpsWuT3c9LP3j0kyPDOBini-LRUpKX3n4ljhJIHzl-Jdv6Z31U65kZRBR1LPwnjcBUg4hoc50i8JZsSLsrUYFfpYVuxM0L4ch0l2-FvPtmZs831mOQgT8e1s7GPB7kJBhrQBagGF3eVnAiImJjslXNQhy4eQr6Nffb5Wa61Tec52LX5-gmoNSuA0PW5yuYGuDO2faULW74u8ZfmMUxd2x3E3M6E0deP_rj27FUQCECdbO6ATVanA16wnW7MrySu2m-Kt83XyATdVoNDls-coxA4UxuX7Rmlr2eGM7ZRKtypt12GziKnZgNglK5c_4mmMP2xeeLU1fneBLkvuHSEnoFjqZnAaI0ei6pW8Jy3k8txI5MucaRkXdPOhCm3Nwj8B9rBAh0hU64NVVb7C28Gz8LCwZkRhtGRY_v2vzcS0DaomK2G63vyQMKx3VUc9_RnkxcI6bwy6xG2GBEjpV8tHxXgw8zGc53_8EMo-9EM1PpjOHHYyaYoubDbxHaSJPwCPqi_OlGbl2h8gIM",
    "d": "VTCEVB45Dd2NNSu9_iNW5VEkDdXoKec0SPEUV6DfXjG_SnlTxbYRiHXQGcU9a1CvyRXBQJD2RkKO4zWxSmh6bci0fKSLJtOJXKJeNvXxvsb41BLuK2ruPxRjdEuFQLuSoZzgCFJuTeVA4XV6bT_pr0UOSg-f-TogU6yt_EOrqTeGYshkqlibWmsVSGDRTbJaIL3LG00UAsw5qIBPkkyEBoS3C86XJcieKMlZpGRFXphNemlfRJpiv9vLEyE-mdGhylTVC1qhdpoPyg2Xq9MnMiqWsT8U02C3GHd-WSoWfwNqEAa7WgZqxg7S9I1X6Tf0mNWnXhZVK9gCB5IBZkVfAIR727N9eFu8QQfBUld3QNtT-JwIjXWvEsk6mc7vx3puiZiT75Adc40gV0-ynAjy2Pb1O51g9mqD19mqvwxUWeW0YBKO03dYUfw9P7lxNUaYZGoc7rUec94xznOZKxgyKXwGGPe1tROMVBZf3Ewv0yrsB6YmDXQVv1p9MHiJ6pd4iXfeyvZjzCAqwUUukMKC6C38KlVLhS_PvX1V4ebDmmfbhlQTwLyJIcL1fxrHDyOVA8ued-TI4ioXO1OXaPwjM6rwhvRYcah6UKRxnF23iJjDZ7sBedrowSYPAjDyeoU4go3MaJIcuuKl3wIrvBe-K8TczkrG4AFx7BktkRA80Lk",
    "p": "6lC25S1c8MQWSbw1a932A2MqjPMkB79H8VQ1eYxTCI7ihMGkubOwr-ZZTcGE_-S0O5GmHPklsAmdWqnNSEotuiCCLX-cvZwbiTi0EfD4P6A9BU8n2ElIuBwWxLZKoqM977Q-2qIUFnvpfPit8Shqu3x-OykEYHDnbSLbOphcbAI1-kGsBui-wmezbvXv-ULwLi3FKey_FJfP7nYf2RazNXk1b7lqe8l3UbotsC86FudHmJe6c7O0epcuUbADeu5cpKPTzf0CMJVsW152KWOc--tXTfA03gANl30qUGYnNm40qYntGxhpUtfUZYGTg9nHKKS-gteCobMVIxHNZk8q6Q",
    "q": "4SdWJW-MMFlrUhVLYmOTgzFNpZ9-xQ3GQ0-uJpjfqfFcwVaEyeLMQE2lDknCd58RwRpYHJBjKWIO8yhNkeIVcmSl1Fyg91g61gOBtXQoz6JQm5K9y2snGlj4BC4nQdP39dCdg7xjiRMa9nwEFnxL8hNN27xDq2n81F3VsFqG3VmXY5YMnALUjkNCVOZM_0h8L2RrOCLroKu_NI6WV1LIaAKe7y99ZiOsQl5MMjwp12n4ea_U7l_Oyp2NlEsp5idbYa1TrC8LOWOn80jgM_iE3DrxAB5JKuI8vx_A7Jrral-aLT4oTtJDKV9B5Y7PPuhDYZrqHOkI0fwUrDIRRzYUiw",
    "dp": "CnUxxIbCyCgoSoAw7jCI41vQsVvEtufNoTK99D_UEOS3rW8rF_KyJxej0rmZYwZlGOeGP3LLQNEdCcfcVqag5da_mKJCb6ABBp3WQ5q6qbRQJOWEhL24licCySLNr_aTNBiaWY20UdCT-jTrJoFESjvjMmbBQECpw5AzsqjMLzHmENZPhDttECYqtwAZBsn7CESYsSdU2-luqVjyUPEXbIKNZQAkhYPXZHlnwp5I_G60HlZfRvy1SGdo9NJjRWBQGDULpfzt1RdGL8nGglBk2EWHrv3Sjjn4YVN_yPjWNTKz_QEf6P6s7LqfSyx-VfspTWIU8qgFt4vTnK4VucQ8yQ",
    "dq": "BhZ2MdTuSXBhgnqo6yQeHPH8U3oYh2Nz9OX2o3yGr6WjCGc6d-r18tcmm1hLNcjLRhlcQIl25OuN0-1HC6a9RbaK9U772zQ7gwXdP_bAE70jyNES6KkhCYlWS2akEReWIMNfPuydFFu74uY_hgweUZFMDaDtg3j-KQ_Qc1A_TUTa3wpzlNROwvn2lS0U7-IZ2X4xl_b5wAJkzRr93aaTXJyVh4oVLenRAopiLQmLaBOpcEDc1QUqJjhUV6ogm-R8iAuTs5giCY80P1O9HCqgDQRa99HZ0JsFYXWOVddqfhnPpWGE3Xy57ChzM63E1MKa78ysf9OdNXBHbtB7vx0rOQ",
    "qi": "QTbN_oNqyg9Zi9k2zlR4qtBZwDlDwCU6E_QrCKDY1z3pIvLFmc9eVO8aLek_GEKvvjri8voEctK-lrPRipwpdXj7cxw93cfS86vK6FSkb9plkInBfoKnC7DEOTP2Gx7WpHNQPbR8C8yFAidiRKc7lqgvRSh0LvWBzZ-spUANKAfNBaR6RAy2EAavAojeRMGxANqjqqnYP3Vwl35ZwNtmzkK_qIvsjKe3xFWMiCfzeFatunV2xUhJNrenoBoNp4z_66Xu-jUPLwRcWDdI7fz3MD3kZBH3gH4t52Amod79WxRriRW0SYcUeuvKbAi9FJv0RiCnvt0vzkjpF0XtukyHIg"
  }

  constructor(arlocal) {
    if (!window.armetadata) // TODO: rename to pondarMetadata
      window.armetadata = ArweaveApi.INIT_METADATA

    this.InitArweave(arlocal)
  }

  async InitArweave(arlocal) {
    if (arlocal) {
      this.arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http',
        timeout: 20000,
        logging: false,
      })
    }
    else {
      this.arweave = Arweave.init({})
    }
    window.arweave = this.arweave
  }

  async newTransaction(json_data) {
    let tx = await this.arweave.createTransaction({data: json_data}, ArweaveApi.TESTKEY) // window.testWeave.rootJWK
    tx.addTag('Content-Type', 'application/json')
    tx.addTag('Unix-Time', ArweaveApi.unixTimestamp())
    tx.addTag('Podner-version', 'v0.02-pre-pre-alpha')
    return tx
  }

  /* @param [Object] tx A newly created transaction on Arweave
   * @return [Number] The id generated for the new tx, upon successful signing
   */
  async signAndPostTransaction(tx) {
    await this.arweave.transactions.sign(tx, ArweaveApi.TESTKEY)
    await this.arweave.transactions.post(tx)
    console.log(`posted: "${tx.id}"`)
    return tx.id
  }

  // uploadToArweave = async (data, fileType, epObj, event) => {
  //     const wallet = await window.arweaveWallet.getActiveAddress()
  //     if (!wallet) { return null } else {
  //       this.arweave.createTransaction({ data: data }).then((tx) => {
  //         tx.addTag("Content-Type", fileType);
  //         tx.reward = (+tx.reward * 2).toString();
  //         this.arweave.transactions.sign(tx).then(() => {
  //           this.arweave.transactions.post(tx).then((response) => {
  //             console.log(response)
  //             if (response.statusText === "OK") {
  //             // ... then tell me it's ok

  async postPodcastMetadata(podcast_id) {
    console.log(window.rssmetadata)
    if (!Object.keys(window.rssmetadata.episodes[podcast_id]).length) {
      // No metadata to update
      return
    }

    podcast_id = String(podcast_id)
    let episodes_json = JSON.stringify(window.rssmetadata.episodes[podcast_id])
    let podcast_metadata = window.rssmetadata.podcasts[podcast_id]
    console.log(window.rssmetadata.episodes[podcast_id])
    console.log(Object.keys(window.rssmetadata.episodes[podcast_id]))
    let first_episode_id = Object.keys(window.rssmetadata.episodes[podcast_id])[0]
    let last_episode_id = Object.keys(window.rssmetadata.episodes[podcast_id]).slice(-1)[0]

    let tx = await this.newTransaction(episodes_json)
    tx.addTag('Podner-type',          'Podcast')
    tx.addTag('Podner-id',            podcast_id)
    tx.addTag('Podner-first-episode', first_episode_id)
    tx.addTag('Podner-last-episode',  last_episode_id)
    tx.addTag('Podner-rss2-feed',     podcast_metadata['rss2_feed'])
    tx.addTag('Podner-title',         podcast_metadata['title'])
    tx.addTag('Podner-description',   podcast_metadata['description'])
    podcast_metadata['categories'].forEach(category => {
      tx.addTag('Podner-category',  category)
    })
    podcast_metadata['keywords'].forEach(keyword => {
      tx.addTag('Podner-keyword',   keyword)
    })

    console.log('Signing and posting podcast')
    return await this.signAndPostTransaction(tx)
  }

  async getNewestPodcastMetadata(feed_url) {
    let batch_index = '10001'
    do {
      try {
        console.log(`batch_index=${batch_index}`)
        let [tx_id, podcast_tags] = await this.getNewestPodcastMetadataBatch(feed_url, batch_index)
        console.log(tx_id, podcast_tags)
        if (!tx_id || !podcast_tags) {
          // Metadata starting from episode `batch_index` was not found on Arweave
          return
        }
        batch_index = String(parseInt(podcast_tags['Podner-last-episode']) + 1)
        await this.loadMetadataBatch(tx_id, podcast_tags)
      }
      catch (error) {
        batch_index = null
        console.warn(`Error loading Podcast metadata: ${error}`)
      }
    }
    while (batch_index)
  }

  /* @return [<String, Object>]
   */
  async getNewestPodcastMetadataBatch(feed_url, batch_index = '10001') {
    let tags = null
    let tag_filter = [['Podner-rss2-feed', feed_url],
                      ['Podner-first-episode', batch_index]]
    let edges = await this.postGQLQuery(ArweaveApi.gqlQueryPodcast(tag_filter))
    console.log('edges', edges)

    if (edges.length) {
      tags = edges[0].node.tags
      let tx_id = edges[0].node.id
      return [tx_id, ArweaveApi.tagsToObject(tags)]
    }
    return [null, null]
  }

  async loadMetadataBatch(tx_id, podcast_tags) {
    console.log('loadMetadataBatch', tx_id, podcast_tags)
    await this.arweave.transactions.getData(tx_id, {decode: true, string: true}).then(data => {
      let podcast_id = null
      let json = null
      try {
        let json = JSON.parse(data)
        console.log(json)
        if (podcast_tags) {
          podcast_id = podcast_tags['Podner-id']
          window.armetadata.podcasts[podcast_id] = {
            categories:  podcast_tags['Podner-category'], //TODO: multiple categories
            keywords:    podcast_tags['Podner-keyword'], //TODO: multiple keywords
            description: podcast_tags['Podner-description'],
            rss2_feed:   podcast_tags['Podner-rss2-feed'],
            title:       podcast_tags['Podner-title']
          }
        }
        // Merge present metadata with metadata from json
        window.armetadata.episodes[podcast_id] =
            Object.assign({}, window.armetadata.episodes[podcast_id], json)
      }
      catch (error) {
        console.warn(`Error loading JSON metadata: ${error}. JSON: ${json}`)
      }
    })
  }

  /* @return [Object] nodes */
  async postGQLQuery(query) {
    try {
      return await this.arweave.api.post('/graphql', query).then((response) => {
        if (response.status >= 400) {
          let error_msg =
              `Error in GraphQL query, got ${response.status} response: ${response.statusText}`
          console.warn(error_msg)
          throw new Error(error_msg)
        }

        return response.data.data.transactions.edges
      })
    }
    catch (error) {
      return []
    }
  }
  /* @param [<Object>] tags
   * @return [Object] `tags` reformatted from [{name: name_string, value: value_string}] to:
   *   {name_string => value_string}
   */
  static tagsToObject(tags) {
    return Object.fromEntries(tags.map(t => ([t.name, t.value])))
  }

  /* @return [Number] Canonical Unix timestamp in seconds since UTC epoch */
  static unixTimestamp() {
    return Math.floor(Date.now() / 1000)
  }

   /* @param [<(String, String)>] tag_filter Array of tuples with both a 'name' and 'value' String,
    *   specifying ANDed tag names and values constraints for transactions
    * @param [String] extra_args
    * @param [Number] num Max number of transactions
    * @return [{'query' => String}] An Object containing the GraphQL query as String, for feeding
    *   to Arweave's `/graphql` endpoint
    */
  static gqlQueryPodcast(tag_filter = [], extra_args = '', num = 100) {
    let tag_filter_query = ''
    for (let i = 0; i < tag_filter.length; i++) {
      let [tag_name, tag_values] = tag_filter[i]
      tag_filter_query += `{name: "${tag_name}", values: "${tag_values}"}`
      if (i != tag_filter.length - 1)
        tag_filter_query += ", "
    }
    if (tag_filter_query)
      tag_filter_query = `tags: [${tag_filter_query}], `
    const query = {
      query: `
        query {
          transactions(${tag_filter_query}first: ${num}, ${extra_args}sort: HEIGHT_DESC) {
            edges {
              node {
                id
                tags {
                  name
                  value
                }
                block {
                  id
                  timestamp
                }
              }
            }
          }
        }`
    }
    console.log(query.query)
    return query
  }

  // async getNewestPodcastMetadataBatch(tx_ids, batch_index = '10001') {
  //   let newest_batch = null
  //   let newest_timestamp = 0
  //   let batch_tags = null

  //   for (let tx_id of tx_ids) {
  //     console.log(`tx_id: ${tx_id}`)
  //     let tx = await this.arweave.transactions.get(tx_id)
  //     let tags = tx.get('tags').map(tag => {
  //       let key = tag.get('name', {decode: true, string: true})
  //       let value = tag.get('value', {decode: true, string: true})
  //       return [key, value]
  //     })
  //     // Convert tags to dictionary format
  //     tags = Object.fromEntries(tags.map(([k, v]) => [k, v]))
  //     console.log(tags)
  //     // Find the newest version of this batch
  //     if (tags['Podner-first-episode'] === batch_index && tags['Unix-Time'] > newest_timestamp) {
  //       newest_batch = tx_id
  //       newest_timestamp = tags['Unix-Time']
  //       batch_tags = tags
  //     }
  //   }
  //   return batch_tags
  // }
}

export default ArweaveApi

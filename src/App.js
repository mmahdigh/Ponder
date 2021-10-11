import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar.js'
import MetadataFormatter from './formatting/MetadataFormatter.js'
import ArweaveApi from './arweave/ArweaveApi.js'


class App extends Component {
  // componentDidMount
  async componentWillMount() {
    const USE_ARLOCAL = true
    const TEST_RSS1 = 'https://feeds.simplecast.com/dHoohVNH'
    const TEST_RSS2 = 'https://thejimmydoreshow.libsyn.com/rss'

    let arweaveApi = await new ArweaveApi(USE_ARLOCAL)
    let formatter = new MetadataFormatter()
    this.setState({ loading: true })

    this.setState({ arweaveApi })
    this.setState({ formatter })

    /* fetch all metadata from Arweave for podcast with rss url == TEST_RSS1,
     * upon which it can be accessed through window.armetadata */
    await this.state.arweaveApi.getNewestPodcastMetadata(TEST_RSS1)

    /* fetch all metadata from RSS and the diff with armetadata is placed in window.rssmetadata */
    await this.loadMetadataForFeed(TEST_RSS1)

    /* post the metadata of the podcast from window.rssmetadata to Arweave */
    let tx_id = await this.state.arweaveApi.postPodcastMetadata(TEST_RSS1)
    if (tx_id) {
      console.log(`tx_id: ${tx_id}`)
      let res = await window.arweave.api.get('/mine')
      console.log(res)
    }
    this.setState({ loading: false })
  }

  async loadMetadataForFeed(feed_url) {
    await this.state.formatter.formatMetadataFromFeedURL(feed_url)
  }

  constructor(props) {
    super(props)
    this.state = {
      formatter: null,
      arweaveApi: null,
      account: '',
      loading: true
    }

    this.loadMetadataForFeed = this.loadMetadataForFeed.bind(this)
    window.loadMetadataForFeed = this.loadMetadataForFeed

    this.decodeTags = this.decodeTags.bind(this)
    window.decodeTags = this.decodeTags
  }

  // Temp method for debugging
  async decodeTags(tx_id) {
    const tx = window.arweave.transactions.get(tx_id).then(transaction => {
      transaction.get('tags').forEach(tag => {
        let key = tag.get('name', {decode: true, string: true})
        let value = tag.get('value', {decode: true, string: true})
        console.log(`${key} : ${value}`)
      })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <p></p>
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar.js'
import MetadataFormatter from './formatting/MetadataFormatter.js'
import ArweaveApi from './arweave/ArweaveApi.js'


class App extends Component {
  async componentWillMount() {
    const USE_ARLOCAL = true
    const TEST_RSS1 = 'https://feeds.simplecast.com/dHoohVNH'
    const TEST_RSS2 = 'https://thejimmydoreshow.libsyn.com/rss'

    let arweaveApi = await new ArweaveApi(USE_ARLOCAL)
    let formatter = new MetadataFormatter()
    this.setState({ arweaveApi })
    this.setState({ formatter })

    await this.state.arweaveApi.getNewestPodcastMetadata(TEST_RSS1)

    await this.LoadMetadataForFeed(TEST_RSS1)

    let tx_id = await this.state.arweaveApi.postPodcastMetadata(1)
    if (tx_id) {
      console.log(`tx_id: ${tx_id}`)
      let res = await window.arweave.api.get('/mine')
      console.log(res)
    }
  }

  async LoadMetadataForFeed(feedUrl) {
    await this.state.formatter.formatMetadataFromFeedURL(feedUrl)
  }

  parseFeed(url) {
    this.state.formatter.formatMetadataFromFeedURL(url)
  }

  constructor(props) {
    super(props)
    this.state = {
      formatter: null,
      arweaveApi: null,
      account: '',
      loading: true
    }

    this.parseFeed = this.parseFeed.bind(this)
    window.parseFeed = this.parseFeed

    this.decodeTags = this.decodeTags.bind(this)
    window.decodeTags = this.decodeTags
  }

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

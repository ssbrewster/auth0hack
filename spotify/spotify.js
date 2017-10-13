'use strict'

const _ = require('lodash')
const request = require('request-promise-native')

/**
 * Spotify class
 *
 * This class enables working with Spotify to authenticate and access API endpoints.
 */
class Spotify {

  /**
   * Construct a new instance
   */
  constructor(context, queryMap) {
    this.spotifyClientId = context.secrets.SPOTIFY_CLIENT_ID
    this.spotifyClientSecret = context.secrets.SPOTIFY_CLIENT_SECRET
    this.spotifyUrl = context.meta.SPOTIFY_URL
    this.queryMap = queryMap
    this.tokenUri = context.meta.SPOTIFY_TOKEN_URI
  }

  /**
   * Retrieve a token from Spotify
   */
  getToken() {
    const basicAuth = new Buffer(`${this.spotifyClientId}:${this.spotifyClientSecret}`).toString('base64')
    const options = {
      method: 'POST',
      uri: this.tokenUri,
      headers: {
        'Authorization': `Basic ${basicAuth}`,
      },
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
    }
    console.log(`Will make request for Spotify token with options ${JSON.stringify(options)}`);

    return request(options)
    .then(tokenResponse => tokenResponse.access_token)
    .catch(err => {
      console.log(err);
      throw new Error(`Spotify error ${JSON.stringify(err)}`)
    })
  }

  /**
   * Retrieve a playlist from Spotify
   */
  getPlaylist(queryKey) {
    const spotifyUri = this.spotifyUri(queryKey)

    return this.getToken()
    .then(token => {
      const options = {
        method: 'GET',
        uri: spotifyUri,
        json: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }

      return request(options)
    })
    .then(searchResult => {
      const playlist = this.selectePlaylist(searchResult.playlists)
      const playlistUrl = this.playlistUrl(playlist)

      return playlistUrl
    })
    .catch(err => {
      console.log(err);

      return err
    })
  }

  spotifyUri(queryKey) {
    const queryStr = `&q=${this.queryMap[queryKey].join('&')}`
    const spotifyUri = `${this.spotifyUrl}${queryStr}`

    return spotifyUri
  }

  selectePlaylist(playlists) {
    const samplePlaylist = _.sample(playlists.items)

    return samplePlaylist
  }

  playlistUrl(selectePlaylist) {
    const playlistUrl = selectePlaylist.external_urls.spotify
    
    return playlistUrl
  }
}

module.exports = Spotify

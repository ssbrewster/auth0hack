'use strict'

const _ = require('lodash')
const request = require('request-promise-native')

/**
 * Weather class
 *
 * Retrieve the weather from Open Weather Map API
 */
class Weather {
  
  /**
   * Construct a new instance
   */
  constructor(context) {
    this.city = context.data.city
    this.apiKey = context.secrets.WEATHER_API_KEY
    this.openWeatherUrl = context.meta.OPEN_WEATHER_URL
  }

  getWeather() {
    const uri = this.openWeatherMapUri()
    const options = {
      method: 'GET',
      uri: uri,
      json: true
    }
    console.log(`Will get weather from Open Weather Map with options ${JSON.stringify(options)}`);

    return request(options)
    .then(openWeatherResponse => {
      const mainWeather = this.getMainWeather(openWeatherResponse)
      console.log(`Got weather ${mainWeather}`)

      return mainWeather
    })
    .catch(err => err)
  }

  openWeatherMapUri() {
    const query = encodeURIComponent(`${this.city}`)
    const uri = `${this.openWeatherUrl}?q=${query}&appid=${this.apiKey}`;

    return uri
  }

  getMainWeather(openWeatherResponse) {
    return openWeatherResponse.weather[0].main
  }
}

module.exports = Weather

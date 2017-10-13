'use strict';

const Weather = require('./open-weather/weather')
const Spotify = require('./spotify/spotify')

const musicWeatherMap = {
  'Additional': ['folk', 'pop', 'hip%20hop', 'shoegaze', 'house', 'metal', 'classic%20rock'],
  'Atmosphere': ['folk', 'R\&B', 'hip%20hop', 'easy'],
  'Clear': ['light', 'folk', 'pop', 'dance', 'house', 'psychedelic', 'cheese'],
  'Clouds': ['techno', 'moody', 'house', 'rock'],
  'Drizzle': ['folk', 'shoegaze', 'acoustic', 'minimal'],
  'Extreme': ['gabba', 'extreme%20metal', 'hot', 'burning', 'freezing'],
  'Rain': ['grunge', 'blac%20metal', 'psych', 'bleak', 'minimal'],
  'Snow': ['classic%metal', 'christmas', 'black%20metal'],
  'Thunderstorm': ['dark', 'heavy', 'metal', 'death%20metal', 'hard%techno']
}

module.exports = (context, done) => {
  const weather = new Weather(context)
  const spotify = new Spotify(context, musicWeatherMap)

  weather.getWeather()
  .then(queryKey => spotify.getPlaylist(queryKey))
  .then(playlistUrl => {
    console.log(`Playlist url is ${playlistUrl}`)
    done(null, playlistUrl)
  })
  .catch(err => done(err))
}


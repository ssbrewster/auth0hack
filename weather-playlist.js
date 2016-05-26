/* jshint node: true */
'use strict';
var request = require('request-promise@1.0.2');

function getWeather(ctx) {
  console.log(JSON.stringify(ctx.data));
  const city = ctx.data.city;
  const uri = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + ctx.data.WEATHER_API_KEY;
  const requestOptions = {
    method: 'GET',
    uri: uri,
    json: true
  };
  console.log(JSON.stringify(requestOptions));

  return request(requestOptions)
    .then((response) => {
      console.log(response.weather[0].main);
      return response.weather[0].main;
    })
    .catch(error => error);
}

function getPlaylist(weather) {
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
  };

  const queries = shuffle(musicWeatherMap[weather]);
  const query1 = queries[0];
  const query2 = queries[1];

  const uri = 'https://api.spotify.com/v1/search?type=playlist&q=' + query1 + '&' + query2;
  const requestOptions = {
    method: 'GET',
    uri: uri,
    json: true
  };
  console.log(JSON.stringify(requestOptions));

  return request(requestOptions)
    .then((response) => {
      const items = shuffle(response.playlists.items);
      return items[0].external_urls.spotify;
    })
    .catch(error => error);

}

// Credit to http://stackoverflow.com/a/2450976/1230663
function shuffle(array) {
  const arrayCopy = array;
  var currentIndex = arrayCopy.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
}

module.exports = (ctx, done) => {
  getWeather(ctx)
    .then((weather) => {
      return getPlaylist(weather);
    })
    .then((playlist) => {
      done(null, playlist);
    }) 
    .catch(error => error);
};


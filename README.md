# Get a Spotify playlist based on weather in a given location with help from webtask.io

A tiny fun app that uses the Open Weather Map and Spotify APIs to get current weather in a given location, then maps that weather to some music genres and descriptions, passing them as queries to the Spotify playlist search endpoint. A random playlist is picked from the list of Spotify playlists.

The mapping of weather condition to music genres and moods is hardcoded in `weather-playlist.js` but there's definitely opportunity to add much more to these mappings.

## Prerequisites

 - [webtask.io](https://webtask.io/docs/101)
 - an api key from [openweathermap.org](http://openweathermap.org/appid)

## Setting up the webtask

Clone this repository then create the webtask:

    wt init

Then pass in parameters that include the api key you got from openweathermap.org and a city, zip or coordinates of your choice:

    wt create weather-playlist.js --param city="New York" --secret WEATHER_API_KEY=yourapikeyfromopenweathermap

This returns a url that you can use to get your playlist like so:

    open "$(curl https://webtask.it.auth0.com/api/run/wt-your-reg/weather-playlist\?webtask_no_cache\=1 | awk -F'\"' '{print $2}')"""

> The above example uses the `open` utility in OSX, use `xgd-open` in Linux distros.

Even better setup a daily cron job:

    crontab -l | { cat; echo "0 9 * * * open "$(curl https://webtask.it.auth0.com/api/run/wt-your-reg/weather-playlist\?webtask_no_cache\=1 | awk -F'\"' '{print $2}')""; } | crontab -" }

## Licenses

**MIT License**

Copyright (c) 2016 Simon Brewster

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


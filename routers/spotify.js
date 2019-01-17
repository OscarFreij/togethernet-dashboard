const Router = require('express').Router()
const axios = require('axios')
const config = require('../dashboard.config.js')
const url = require('url')

// A deadly sin, but since this is only going to be used on localhost I've decided that I don't care
var accessToken, refreshToken

Router.get('/login', function(req, res) {
  var scopes = 'user-read-currently-playing'
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + config.spotify.client_id +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + encodeURIComponent(config.spotify.redirect_url))
})

Router.get('/isauth', (req, res) => {
  res.json({
    isauth: accessToken != null
  })
})


callbackPathname = url.parse(config.spotify.redirect_url).pathname
Router.get(callbackPathname, (req, res) => {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      code: req.query.code,
      redirect_uri: config.spotify.redirect_url,
      grant_type: 'authorization_code',
      client_id: config.spotify.client_id,
      client_secret: config.spotify.client_secret
    }
  }).then((response) => {
    accessToken = response.data.access_token
    refreshToken = response.data.refresh_token
    setTimeout(refreshAccessToken, response.data.expires_in * 1000)
    res.redirect('/')
  })
  .catch((error) => {
    console.log(error)
    res.send("something went wrong")
    // TODO: fix error handeling
  })
})

function refreshAccessToken() {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: config.spotify.client_id,
      client_secret: config.spotify.client_secret
    }
  }).then((response) => {
    accessToken = response.body.access_token
    refreshToken = response.body.refresh_token || refreshToken
    setTimeout(refreshToken, response.data.expires_in * 1000)
  }).catch((error) => {
    console.log("error in refreshToken")
    // TODO: implement error handeling
  })
}


Router.get('/song', (req, res) => {
  axios({
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    method: 'get',
    headers: {
      'Authorization': "Bearer " + accessToken
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((error) => {
    console.log('could not get song')
    console.log(error)
  })
})


module.exports = Router

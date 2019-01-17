const Router = require('express').Router()
const axios = require('axios')

const client_id = ''
const client_secret = ''
const redirect_uri = 'http://localhost/callback/spotify'

Router.get('/login', function(req, res) {
  var scopes = 'user-read-currently-playing';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
})

Router.get('/isauth', (req, res) => {
  res.json({
    isauth: req.session.access_token != null
  })
})

Router.get('/callback/spotify', (req, res) => {
  console.log("callback");
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      code: req.query.code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
      client_id,
      client_secret
    }
  }).then((response) => {
    req.session.access_token = response.data.access_token
    req.session.refresh_token = response.data.refresh_token
    console.log(req.session);
    res.redirect('/')
  })
  .catch((error) => {
    console.log(error);
    res.json({error:"error"})
    // TODO: implement error handeling
    // TODO: and refreshToken
  })
})

function refreshToken() {
  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'refresh_token',
      refresh_token: this.refresh_token,
      client_id,
      client_secret
    }
  }).then((response) => {
    this.access_token = response.body.access_token
  }).catch((error) => {
    console.log("error in refreshToken")
    // TODO: implement error handeling
  })
}

module.exports = Router

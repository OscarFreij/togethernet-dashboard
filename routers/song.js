const Router = require('express').Router()
const axios = require('axios')

Router.get('/song', (req, res) => {
  if(req.session.access_token) {
    axios({
      url: 'https://api.spotify.com/v1/me/player/currently-playing',
      method: 'get',
      headers: {
        'Authorization': "Bearer " + req.session.access_token
      }
    }).then((response) => {
      res.json(response.data)
    }).catch((error) => {
      if(error.response.status == 401) {
        //refreshToken.call(req.session)
      }
      res.send("kanske nästa gång")
    })
  } else {
    res.send("nope, ingen access token")
  }
})

module.exports = Router

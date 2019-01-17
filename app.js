const express = require('express')
const app = express()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const compiler = webpack(require('./webpack.config.js'));
app.use(webpackMiddleware(compiler, {
  // webpack-dev-middleware options
}));


app.use(cookieParser())
app.use(session({
  secret: "Shh, its a secret! bitconect, alexander was here (kinda)",
  resave: false,
  saveUninitialized: false
}))

// Static files
app.use(express.static('./dist'))

// Routers
app.use(require('./routers/spotify.js'))

app.listen(80, () => {
  console.log('we are up!')
})

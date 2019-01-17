const express = require('express')
const app = express()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')


app.use(require('body-parser').urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
  secret: "Shh, its a secret! bitconect, alexander was here (kinda)",
  resave: false,
  saveUninitialized: false
}))

// logger
app.use(logger('dev'))

// Static files
app.use(express.static('./dist'))

// Routers
app.use(require('./routers/song.js'))
app.use(require('./routers/auth.js'))

module.exports = app

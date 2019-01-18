const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  // webpack-dev-middleware options
}));

// Static files
app.use(express.static('./dist'));

// Routers
app.use(require('./routers/spotify.js'));

app.listen(80, () => {
  console.log('we are up!');
});

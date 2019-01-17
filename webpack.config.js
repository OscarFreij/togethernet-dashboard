const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
    ]

  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/assets/favicon.png',
      title: 'Togethernet Dashboard',
      template: 'src/template.html'
    })
  ]
}

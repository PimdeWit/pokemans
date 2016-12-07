var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/javascript/index.js',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
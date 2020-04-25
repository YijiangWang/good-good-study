// @ts-check
const path = require('path');
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  // watch: true,
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'}
    ]
  }
}
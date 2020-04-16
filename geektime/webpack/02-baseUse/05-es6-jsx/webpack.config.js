const path = require('path');
  module.exports = {
    entry: {
      es6: './src/es6.js',
      react: './src/react.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    mode: "production",
    module: {
      rules: [
        {
          test: '/\.js$/', 
          use: "babel-loader",
          exclude: /node_modules/
        }
      ]
    }
  }
// @ts-check
const path = require('path');

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  mode: "production",
  module: {
    rules: [
      {test: /\.js$/, use: "babel-loader"},
      // {test: /\.(jpg|jpeg|gif|png|svg)/i, use: "file-loader"}
      {test: /\.(jpg|jpeg|gif|png|svg)/i, use: [
        {loader: "url-loader", options: {
          limit: 10240
        }}
      ]}
    ]
  }
}
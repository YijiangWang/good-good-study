const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    login: './src/login.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: { // loaders统一放在module下的rules里面
    rules: [
      {test: /\.txt$/, use: 'raw-loader'} // test指定匹配规则,use指定使用的loader名称
    ]
  }
}
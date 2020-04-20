const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash].js' // js文件指纹的设置
  },
  mode: 'production',
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'},
      {test: /\.css$/, use: [
        MiniCssExtractPlugin.loader,  // css文件指纹设置的第一个地方
        'css-loader'
      ]},
      {test: /\.(jpg|jpeg|png|svg|gif)$/, use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]' // 图片文件的指纹设置
          }
        }
      ]}
    ]
  },
  plugins:[
    // css 文件指纹设置的第二个地方
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
  ]
}
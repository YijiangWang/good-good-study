//@ts-check

module.exports = {
  entry: {
    app: './src/app.js',
    login: './src/login.js'
  },
  output: {
    path: __dirname+'/dist',
    filename: '[name].js'
  },
  mode: 'production'
}